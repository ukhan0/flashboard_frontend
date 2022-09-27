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

const Cache = () => {
  const { user, isNewEmailNotification } = useSelector(state => state.User);
  const dispatch = useDispatch();
  const domesticKey = 'lastTimeCompleteDataUpdatereal';
  const globalKey = 'lastTimeCompleteGlobalDataUpdatereal';

  const refreshIndexDB = useCallback(
    async (apiParam, indexDBCollectionName) => {
      const response = await axios.get(`${config.apiUrl}/api/get_companies_data`, {
        params: {
          auth_token: user.authentication_token,
          selected_type: apiParam,
          user_id: user.id,
          subject: 'all'
        }
      });
      let data = get(response, 'data.data.content', []);
      if (data && data.length > 0) {
        const currMoment = moment().format();
        if (apiParam === 'domestic') {
          localStorage.setItem(domesticKey, currMoment);
          dispatch(setCompleteCompaniesData(data));
        } else if (apiParam === 'global') {
          localStorage.setItem(globalKey, currMoment);
          dispatch(setCompleteGlobalCompaniesData(data));
        }
        await indexedDB()
          .collection(indexDBCollectionName)
          .set(data);
      }
    },
    [dispatch, user]
  );

  const cacheData = useCallback(async () => {
    dispatch(setCompleteDataLoadedFlag(false));
    try {
      const previousStoredData = await indexedDB()
        .collection(config.indexDbDomesticCompniesData)
        .get();
      if (previousStoredData && previousStoredData.length > 0) {
        dispatch(setCompleteCompaniesData(previousStoredData));
      } else {
        await refreshIndexDB('domestic', config.indexDbDomesticCompniesData);
        dispatch(setCompleteDataLoadedFlag(true));
        return;
      }
      const savedDate = localStorage.getItem(domesticKey);
      if (savedDate) {
        if (new Date() - new Date(savedDate) > 3600000) {
          await refreshIndexDB('domestic', config.indexDbDomesticCompniesData);
        }
      } else await refreshIndexDB('domestic', config.indexDbDomesticCompniesData);
    } catch (error) {
      console.log(error);
    }
    dispatch(setCompleteDataLoadedFlag(true));
  }, [dispatch, refreshIndexDB]);

  const cacheDataGlobal = useCallback(async () => {
    dispatch(setCompleteDataLoadedGlobalFlag(false));
    try {
      const previousStoredData = await indexedDB()
        .collection(config.indexDbGlobalCompniesData)
        .get();
      if (previousStoredData && previousStoredData.length > 0) {
        dispatch(setCompleteGlobalCompaniesData(previousStoredData));
      } else {
        await refreshIndexDB('global', config.indexDbGlobalCompniesData);
        dispatch(setCompleteDataLoadedGlobalFlag(true));
        return;
      }
      const savedDate = localStorage.getItem(globalKey);
      if (savedDate) {
        if (new Date() - new Date(savedDate) > 3600000) {
          await refreshIndexDB('global', config.indexDbGlobalCompniesData);
        }
      } else await refreshIndexDB('global', config.indexDbGlobalCompniesData);
    } catch (error) {
      console.log(error);
    }
    dispatch(setCompleteDataLoadedGlobalFlag(true));
  }, [dispatch, refreshIndexDB]);

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
      cacheData();
      cacheDataGlobal();
    }
  }, [cacheData, cacheDataGlobal, user]);

  return <></>;
};

export default Cache;
