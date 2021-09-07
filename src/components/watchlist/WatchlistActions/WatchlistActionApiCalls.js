import { setIsWatchlistEmailAlertEnable } from '../../../reducers/Watchlist';
import axios from 'axios';
import config from '../../../config/config';
import { get } from 'lodash';

export const updateWatchlistEmailAlertStatus = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { isColorEnable, isEmailAlertEnable } = getState().Watchlist;
    try {
      const response = await axios.post(`${config.apiUrl}/api/users/enable_watchlist_alert`, {
        id: user.id,
        send_watchlist_alert_email: isEmailAlertEnable,
        enable_watchlist_color: isColorEnable
      });
      const isUpdated = get(response, 'data', null);
      const isError = get(isUpdated, 'error', null);
      if (isUpdated && !isError) {
        dispatch(setIsWatchlistEmailAlertEnable(isEmailAlertEnable));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
