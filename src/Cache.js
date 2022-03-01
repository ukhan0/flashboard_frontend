import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import config from './config/config';
import { setCompleteDataLoadedFlag, setCompleteCompaniesData } from './reducers/Watchlist';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// import dummyData from './dummyData';

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
        dispatch(setCompleteCompaniesData(data));
        dispatch(setCompleteDataLoadedFlag(true));
        localStorage.setItem('lastTimeCompleteDataUpdate', lastTimeDataUpdate);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    //  enable following lines and disable above lines to use dummy companies data
    // dispatch(setCompleteCompaniesData(JSON.parse(dummyData)));
    // console.log(JSON.parse(dummyData));
    // dispatch(setCompleteDataLoadedFlag(true));
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(setCompleteDataLoadedFlag(false));
      cacheData();
    }
  }, [cacheData, user, dispatch]);

  return <></>;
};

export default Cache;
