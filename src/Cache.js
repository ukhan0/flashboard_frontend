import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import {
  setCompleteDataLoadedFlag,
  setCompleteCompaniesData,
  setCompleteDataLoadedGlobalFlag,
  setCompleteGlobalCompaniesData,
  setNotificationData
} from './reducers/Watchlist';
import { setIsNewEmailNotification } from './reducers/User';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import SocketService from './socketService';
import { orderBy } from 'lodash';
import { indexedDB } from './components/watchlist/WatchlistHelpers';

const localToTimeInMillis = (timeString) => {
  let timeStringArr = timeString.split(":");
  return (timeStringArr[0] * 60 * 60 * 1000) + (timeStringArr[1] * 60 * 1000) + (timeStringArr[0] * 1000);
};

const isOneHourPassed = (oldTimeStr, currTimeStr) => {
  if((localToTimeInMillis(currTimeStr) - localToTimeInMillis(oldTimeStr)) >= 3600000) return true; //one hour is passed
  else if((localToTimeInMillis(currTimeStr) - localToTimeInMillis(oldTimeStr)) < 3600000) return false; //one hour isn't passed yet
};

const Cache = () => {
  const { user, isNewEmailNotification } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const cacheData = useCallback(async () => {
    try {
      let data = [];
      const lastTimeDataUpdate = moment().format('hh:mm:ss');
      const previousStoredData = await indexedDB()
        .collection(config.indexDbDomesticCompniesData)
        .get();
      if (previousStoredData && previousStoredData.length > 0) {
        data = previousStoredData;
      } else {
        if(isOneHourPassed(localStorage.getItem('lastTimeCompleteDataUpdate'), moment().format('hh:mm:ss'))) {
          const response = await axios.get(
            `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&selected_type=domestic&user_id=${user.id}&subject=all`
          );
          data = get(response, 'data.data.content', []);
          if (data && data.length > 0) {
            await indexedDB()
              .collection(config.indexDbDomesticCompniesData)
              .set(data);
          }
          localStorage.setItem('lastTimeCompleteDataUpdate', lastTimeDataUpdate);
        }
      }
      dispatch(setCompleteCompaniesData(data));
      localStorage.setItem('lastTimeCompleteDataUpdate', lastTimeDataUpdate);
    } catch (error) {
      console.log(error);
    }
    dispatch(setCompleteDataLoadedFlag(true));
  }, [dispatch, user]);

  const cacheDataGlobal = useCallback(async () => {
    try {
      let data = [];
      const lastTimeDataUpdate = moment().format('hh:mm:ss');
      const previousStoredData = await indexedDB()
        .collection(config.indexDbGlobalCompniesData)
        .get();
      if (previousStoredData && previousStoredData.length > 0) {
        data = previousStoredData;
      } else {
        if(isOneHourPassed(localStorage.getItem('lastTimeCompleteGlobalDataUpdate'), moment().format('hh:mm:ss'))) {
          const response = await axios.get(
            `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&selected_type=global&user_id=${user.id}&subject=all`
          );
          data = get(response, 'data.data.content', []);
          if (data && data.length > 0) {
            await indexedDB()
              .collection(config.indexDbGlobalCompniesData)
              .set(data);
          }
          localStorage.setItem('lastTimeCompleteGlobalDataUpdate', lastTimeDataUpdate);
        }
      }
      dispatch(setCompleteGlobalCompaniesData(data));
      localStorage.setItem('lastTimeCompleteGlobalDataUpdate', lastTimeDataUpdate);
    } catch (error) {
      console.log(error);
    }
    dispatch(setCompleteDataLoadedGlobalFlag(true));
  }, [dispatch, user]);

  useEffect(() => {
    if (isNewEmailNotification && user) {
      const apiUrl = `${config.apiUrl}/api/email/notification`;
      axios
        .get(`${apiUrl}`)
        .then(response => {
          let data = get(response, 'data.data', []);
          if (data.length) {
            dispatch(setNotificationData(orderBy(data, ['email_time'], ['desc'])));
          } else {
            dispatch(setNotificationData([]));
          }
        })
        .catch(function(error) {
          dispatch(setNotificationData([]));
          // handle error
          console.log(error);
        });

      dispatch(setIsNewEmailNotification(false));
    }
  }, [dispatch, isNewEmailNotification, user]);

  useEffect(() => {
    if (user) {
      const socket = io.connect(config.socketUrl);
      SocketService.init(socket);
      dispatch(setCompleteDataLoadedFlag(false));
      dispatch(setCompleteDataLoadedGlobalFlag(false));
      cacheData();
      cacheDataGlobal();
    }
  }, [cacheData, cacheDataGlobal, user, dispatch]);

  return <></>;
};

export default Cache;
