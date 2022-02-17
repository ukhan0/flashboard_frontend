import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import { setCompleteDataLoadedFlag, setCompleteCompaniesData } from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const Cache = () => {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const cacheData = useCallback(() => {
    const lastTimeDataUpdate = moment().format('hh:mm:ss');
    const apiUrl = `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&user_id=${user.id}&subject`;
    axios
      .get(`${apiUrl}=all`)
      .then(response => {
        let data = get(response, 'data.data.content', []);
        dispatch(setCompleteCompaniesData(data))
        dispatch(setCompleteDataLoadedFlag(true));
        localStorage.setItem('lastTimeCompleteDataUpdate', lastTimeDataUpdate);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [dispatch, user]);

  
  useEffect(() => {
    if (user) {
      cacheData();
      dispatch(setCompleteDataLoadedFlag(false));
    }
  }, [cacheData, user, dispatch]);

  return <></>;
};

export default Cache;
