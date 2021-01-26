import React, { useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import cjson from 'compressed-json';
import { setCompleteDataLoadedFlag } from './reducers/Watchlist';
import { connect } from 'react-redux';

const Cache = props => {
  const { setCompleteDataLoadedFlag } = props;
  // if user is not loggedIn then redirect to login page.
  const user = useRef(JSON.parse(localStorage.getItem('user')));

  const cacheData = useCallback(() => {
    const allWatchListData = localStorage.getItem(`watchlist-data-all`);
    if (allWatchListData) {
      setCompleteDataLoadedFlag(true);
    }

    const apiUrl = `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.current.authentication_token}&user_id=${user.current.id}&subject`;
    axios.get(`${apiUrl}=all`).then(response => {
      localStorage.setItem(
        `watchlist-data-all`,
        cjson.compress.toString(get(response, 'data.data.content', []))
      );
      setCompleteDataLoadedFlag(true);
    });
  }, [setCompleteDataLoadedFlag]);

  useEffect(() => {
    if (user.current) {
      cacheData();
    }
  }, [cacheData]);

  return <></>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setCompleteDataLoadedFlag: value => dispatch(setCompleteDataLoadedFlag(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cache);
