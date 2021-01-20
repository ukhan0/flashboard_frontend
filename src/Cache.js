import React, { useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import cjson from 'compressed-json';
import {
  setRecentDataLoadedFlag,
  setCompleteDataLoadedFlag
} from './reducers/Watchlist';
import { connect } from 'react-redux';

const Cache = props => {
  const { setRecentDataLoadedFlag, setCompleteDataLoadedFlag } = props;
  // if user is not loggedIn then redirect to login page.
  const user = useRef(JSON.parse(localStorage.getItem('user')));

  const cacheData = useCallback(() => {
    const recentWatchListData = localStorage.getItem(`watchlist-data-recent`);
    if (recentWatchListData) {
      setRecentDataLoadedFlag(true);
    }
    const allWatchListData = localStorage.getItem(`watchlist-data-all`);
    if (allWatchListData) {
      setCompleteDataLoadedFlag(true);
    }

    const apiUrl = `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.current.authentication_token}&user_id=${user.current.id}&subject`;
    axios.get(`${apiUrl}=recent`).then(response => {
      localStorage.setItem(
        `watchlist-data-recent`,
        cjson.compress.toString(get(response, 'data.data.content', []))
      );
      setRecentDataLoadedFlag(true);
    });
    axios.get(`${apiUrl}=all`).then(response => {
      localStorage.setItem(
        `watchlist-data-all`,
        cjson.compress.toString(get(response, 'data.data.content', []))
      );
      setCompleteDataLoadedFlag(true);
    });
  }, [setRecentDataLoadedFlag, setCompleteDataLoadedFlag]);

  useEffect(() => {
    if (user.current) {
      cacheData();
    }
    return () => {
      console.log('cache component destoryed');
    };
  }, [cacheData]);

  return <></>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setRecentDataLoadedFlag: value => dispatch(setRecentDataLoadedFlag(value)),
  setCompleteDataLoadedFlag: value => dispatch(setCompleteDataLoadedFlag(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cache);
