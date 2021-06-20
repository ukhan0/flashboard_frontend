import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import cjson from 'compressed-json';
import { setCompleteDataLoadedFlag } from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const Cache = () => {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const isDataCachedToday = () => {
    const audioPlayDate = localStorage.getItem('lastCompleteWatchlistCacheDate')
    let flag = false
    if(audioPlayDate){
      const dayOfYear = moment().format('DDD')
      if(parseInt(dayOfYear) === parseInt(audioPlayDate)){
        flag = true
      }
    }
    return flag
  }

  const setDataCachedDay = () => {
    const dayOfYear = moment().format('DDD')
    localStorage.setItem('lastCompleteWatchlistCacheDate', dayOfYear)
  }

  const cacheData = useCallback(() => {
    const apiUrl = `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.authentication_token}&user_id=${user.id}&subject`;
    axios.get(`${apiUrl}=all`).then(response => {
      localStorage.setItem(`watchlist-data-all`, cjson.compress.toString(get(response, 'data.data.content', [])));
      setDataCachedDay()
      dispatch(setCompleteDataLoadedFlag(true));
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }, [dispatch, user]);

  useEffect(() => {
    const allData = localStorage.getItem(`watchlist-data-all`)
    if (allData) {
      dispatch(setCompleteDataLoadedFlag(true));
    }

    if ((user && !isDataCachedToday()) || (user && !allData)) {
      cacheData();
      // data should refersh after 24 hours if user does not close the app
      setInterval(() => {
        cacheData();
      }, [24 * 60 * 60 * 1000]) // miliseconds in a day
    }
  }, [cacheData, user, dispatch]);

  return <></>;
};

export default Cache;
