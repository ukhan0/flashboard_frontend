import axios from 'axios';
import {
  setHomePageWatchlistDomestic,
  setHomePageWatchlistGlobal,
  setHomePageLoader,
  hideHomePageLoader
} from '../../reducers/HomePage';
import { get } from 'lodash';
import config from '../../config/config';

const getUserWatchlists = selectedType => {
  return async dispatch => {
    try {
      let user = JSON.parse(localStorage.getItem('user'));
      dispatch(setHomePageLoader());
      const response = await axios.get(
        `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&user_id=${user.id}&subject=watchlist&selected_type=${selectedType}`
      );
      let data = get(response, 'data.data.content', []);

      if (selectedType === 'global') {
        dispatch(setHomePageWatchlistGlobal(data));
      } else {
        dispatch(setHomePageWatchlistDomestic(data));
      }
    } catch (error) {
      console.log(error);
      console.error('Internal server error:', error);
      if (selectedType === 'global') {
        dispatch(setHomePageWatchlistGlobal([]));
      } else {
        dispatch(setHomePageWatchlistDomestic([]));
      }
    } finally {
      dispatch(hideHomePageLoader());
    }
  };
};

export const getUserWatchlist = types => {
  return async dispatch => {
    types.forEach(selectedType => {
      dispatch(getUserWatchlists(selectedType));
    });
  };
};
