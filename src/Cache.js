import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import { setCompleteDataLoadedFlag, setIsOneHourComplete } from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { storeCompleteWatchlist, getCompleteWatchlist } from './utils/helpers';

const Cache = () => {
  const { user } = useSelector(state => state.User);
  const { isOneHourComplete } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();

  const isDataCachedToday = () => {
    const cacheDate = localStorage.getItem('lastCompleteWatchlistCacheDate');
    let flag = false;
    if (cacheDate) {
      const dayOfYear = moment().format('DDD');
      if (parseInt(dayOfYear) === parseInt(cacheDate)) {
        flag = true;
      }
    }
    return flag;
  };

  const setDataCachedDay = () => {
    const dayOfYear = moment().format('DDD');
    localStorage.setItem('lastCompleteWatchlistCacheDate', dayOfYear);
  };

  const cacheData = useCallback(() => {
    const lastTimeDataUpdate = moment().format('hh:mm:ss');
    const apiUrl = `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&user_id=${user.id}&subject`;
    axios
      .get(`${apiUrl}=all`)
      .then(response => {
        let data = get(response, 'data.data.content', []);
        storeCompleteWatchlist(data);
        setDataCachedDay();
        dispatch(setCompleteDataLoadedFlag(true));
        localStorage.setItem('lastTimeCompleteDataUpdate', lastTimeDataUpdate);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [dispatch, user]);

  useEffect(() => {
    setInterval(() => {
      const currentTime = moment().format('hh:mm:ss');
      const lastUpdateTime = localStorage.getItem('lastTimeCompleteDataUpdate');
      let duration = moment(currentTime, 'hh:mm:ss').diff(moment(lastUpdateTime, 'hh:mm:ss'));
      if (Math.abs(duration) >= config.completeDataUpdateDuration) {
        dispatch(setIsOneHourComplete(true));
      } else {
        dispatch(setIsOneHourComplete(false));
      }
    }, [10 * 60 * 1000]); // miliseconds in a minutes (mm:ss:ms)
  }, [dispatch]);

  useEffect(() => {
    const allData = getCompleteWatchlist();
    if (allData) {
      dispatch(setCompleteDataLoadedFlag(true));
    }

    if ((user && !isDataCachedToday()) || (user && !allData) || isOneHourComplete) {
      cacheData();
      dispatch(setCompleteDataLoadedFlag(false));
    }
  }, [cacheData, user, dispatch, isOneHourComplete]);

  return <></>;
};

export default Cache;
