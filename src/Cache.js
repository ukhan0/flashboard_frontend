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

  const refreshIndexDB = useCallback(async (apiParam, localStorageName, currMoment, indexDBCollectionName) => {
    const response = await axios.get(
      `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&selected_type=${apiParam}&user_id=${user.id}&subject=all`
    );
    let data = get(response, 'data.data.content', []);
    if (data && data.length > 0) {
      await indexedDB()
        .collection(indexDBCollectionName)
        .set(data);
    }
    localStorage.setItem(localStorageName, currMoment);
    dispatch(setCompleteCompaniesData(data));
  }, [dispatch, user])

  const cacheData = useCallback(async () => {
    dispatch(setCompleteDataLoadedFlag(false));
    try {
      let data = [];
      const lastTimeDataUpdate = moment().format();
      const previousStoredData = await indexedDB()
        .collection(config.indexDbDomesticCompniesData)
        .get();
      if (previousStoredData && previousStoredData.length > 0) {
        data = previousStoredData;
        dispatch(setCompleteCompaniesData(data));
      } else {
        await refreshIndexDB('domestic', domesticKey, lastTimeDataUpdate, config.indexDbDomesticCompniesData);
        dispatch(setCompleteDataLoadedFlag(true));
        return;
      }
      if (localStorage.getItem(domesticKey)) {
        if (((new Date() - new Date(localStorage.getItem(domesticKey))) > 3600000)) {
          await refreshIndexDB('domestic', domesticKey, lastTimeDataUpdate, config.indexDbDomesticCompniesData);
        }
      } else await refreshIndexDB('domestic', domesticKey, lastTimeDataUpdate, config.indexDbDomesticCompniesData);
    } catch (error) {
      console.log(error);
    }
    dispatch(setCompleteDataLoadedFlag(true));
  }, [dispatch, refreshIndexDB]);

  const cacheDataGlobal = useCallback(async () => {
      dispatch(setCompleteDataLoadedGlobalFlag(false));
    try {
      let data = [];
      const lastTimeDataUpdate = moment().format();
      const previousStoredData = await indexedDB()
        .collection(config.indexDbGlobalCompniesData)
        .get();
      if (previousStoredData && previousStoredData.length > 0) {
        data = previousStoredData;
        dispatch(setCompleteGlobalCompaniesData(data));
      } else {
        await refreshIndexDB('global', globalKey, lastTimeDataUpdate, config.indexDbGlobalCompniesData);
        dispatch(setCompleteDataLoadedGlobalFlag(true));
        return;
      }
      if (localStorage.getItem(globalKey)) {
        if (((new Date() - new Date(localStorage.getItem(globalKey))) > 3600000)) {
          await refreshIndexDB('global', globalKey, lastTimeDataUpdate, config.indexDbGlobalCompniesData);
        }
      } else await refreshIndexDB('global', globalKey, lastTimeDataUpdate, config.indexDbGlobalCompniesData);
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
  }, [cacheData, cacheDataGlobal, user, dispatch]);

  return <></>;
};

export default Cache;
