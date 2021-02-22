import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import cjson from 'compressed-json';
import { setCompleteDataLoadedFlag } from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';

const Cache = () => {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const cacheData = useCallback(() => {
    const allWatchListData = localStorage.getItem(`watchlist-data-all`);
    if (allWatchListData) {
      dispatch(setCompleteDataLoadedFlag(true));
    }

    const apiUrl = `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.authentication_token}&user_id=${user.id}&subject`;
    axios.get(`${apiUrl}=all`).then(response => {
      localStorage.setItem(`watchlist-data-all`, cjson.compress.toString(get(response, 'data.data.content', [])));
      dispatch(setCompleteDataLoadedFlag(true));
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      cacheData();
    }
  }, [cacheData, user]);

  return <></>;
};

export default Cache;
