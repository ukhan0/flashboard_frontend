import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import {
  setCompleteDataLoadedFlag,
  setCompleteCompaniesData,
  setCompleteDataLoadedGlobalFlag,
  setCompleteGlobalCompaniesData
} from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// import dummyData from './dummyData';

const Cache = () => {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const cacheData = useCallback(() => {
    const lastTimeDataUpdate = moment().format('hh:mm:ss');
    const apiUrl = `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&selected_type=domestic&user_id=${user.id}&subject`;
    axios
      .get(`${apiUrl}=all`)
      .then(response => {
        let data = get(response, 'data.data.content', []);
        dispatch(setCompleteCompaniesData(data));
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
        dispatch(setCompleteGlobalCompaniesData(data));
        dispatch(setCompleteDataLoadedGlobalFlag(true));
        localStorage.setItem('lastTimeCompleteGlobalDataUpdate', lastTimeDataUpdate);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [dispatch, user]);

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
