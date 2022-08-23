import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import {
  setCompleteDataLoadedFlag,
  setCompleteCompaniesData,
  setCompleteDataLoadedGlobalFlag,
  setCompleteGlobalCompaniesData,
  setNotificationData,
  setCompleteCompaniesDataIndexs,
  setCompleteCompaniesDataGlobalIndex
} from './reducers/Watchlist';
import { setIsNewEmailNotification } from './reducers/User';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// import dummyData from './dummyData';

const Cache = () => {
  const { user, isNewEmailNotification } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const cacheData = useCallback(() => {
    const lastTimeDataUpdate = moment().format('hh:mm:ss');
    const apiUrl = `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&selected_type=domestic&user_id=${user.id}&subject`;
    axios
      .get(`${apiUrl}=all`)
      .then(response => {
        let data = get(response, 'data.data.content', []);
        let indexs = {};
        let modifiedData = [];

        data.forEach((a, index) => {
          modifiedData.push({ ...a, type: 'domestic' });
          indexs[a.ticker] = { index: index };
        });

        dispatch(setCompleteCompaniesDataIndexs(indexs));
        dispatch(setCompleteCompaniesData(modifiedData));
        dispatch(setCompleteDataLoadedFlag(true));
        localStorage.setItem('lastTimeCompleteDataUpdate', lastTimeDataUpdate);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    // dispatch(setCompleteCompaniesData(JSON.parse(dummyData)));
    // console.log(JSON.parse(dummyData));
    // dispatch(setCompleteDataLoadedFlag(true));
  }, [dispatch, user]);

  const cacheDataGlobal = useCallback(() => {
    const lastTimeDataUpdate = moment().format('hh:mm:ss');
    const apiUrl = `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&selected_type=global&user_id=${user.id}&subject`;
    axios
      .get(`${apiUrl}=all`)
      .then(response => {
        let data = get(response, 'data.data.content', []);
        let indexs = {};
        let modifiedData = [];

        data.forEach((a, index) => {
          modifiedData.push({ ...a, type: 'global' });
          indexs[a.ticker] = { index: index };
        });
        dispatch(setCompleteCompaniesDataGlobalIndex(indexs));
        dispatch(setCompleteGlobalCompaniesData(modifiedData));
        dispatch(setCompleteDataLoadedGlobalFlag(true));
        localStorage.setItem('lastTimeCompleteGlobalDataUpdate', lastTimeDataUpdate);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [dispatch, user]);

  useEffect(() => {
    if (isNewEmailNotification) {
      const apiUrl = `${config.apiUrl}/api/email/notification`;
      axios
        .get(`${apiUrl}`)
        .then(response => {
          let data = get(response, 'data.data', []);
          if (data) {
            dispatch(setNotificationData(data));
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
  }, [dispatch, isNewEmailNotification]);

  useEffect(() => {
    if (user) {
      dispatch(setCompleteDataLoadedFlag(false));
      dispatch(setCompleteDataLoadedGlobalFlag(false));
      cacheData();
      cacheDataGlobal();
    }
  }, [cacheData, cacheDataGlobal, user, dispatch]);

  return <></>;
};

export default Cache;
