import axios from 'axios';
import { setSentimentResult } from '../../reducers/Sentiment';
import { get } from 'lodash';
import config from '../../config/config';
export const getSentimentData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    try {
      const response = await axios.get(`${config.sentimentUrl}?id=${selectedItem}`);
      const data = get(response, 'data', []);
      if (response) {
        dispatch(setSentimentResult(data));
      } else {
        dispatch(setSentimentResult(null));
      }
    } catch (error) {
      dispatch(setSentimentResult(null));
    }
  };
};
