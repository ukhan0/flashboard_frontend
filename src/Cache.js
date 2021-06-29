import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import { setCompleteDataLoadedFlag } from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { storeCompleteWatchlist, getCompleteWatchlist } from './utils/helpers'

const Cache = () => {
  const { user } = useSelector(state => state.User);
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
    const apiUrl = `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.authentication_token}&user_id=${user.id}&subject`;
    axios
      .get(`${apiUrl}=all`)
      .then(response => {
        storeCompleteWatchlist(get(response, 'data.data.content', []))
        setDataCachedDay();
        dispatch(setCompleteDataLoadedFlag(true));
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [dispatch, user]);

  useEffect(() => {
    const allData = getCompleteWatchlist();
    if (allData) {
      dispatch(setCompleteDataLoadedFlag(true));
    }

    if ((user && !isDataCachedToday()) || (user && !allData)) {
      cacheData();
      // data should refersh after 24 hours if user does not close the app
      setInterval(() => {
        cacheData();
      }, [24 * 60 * 60 * 1000]); // miliseconds in a day
    }
  }, [cacheData, user, dispatch]);

  return <></>;
};

export default Cache;
