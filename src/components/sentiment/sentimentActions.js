import axios from 'axios';
import { setSentimentResult, setIsLoading } from '../../reducers/Sentiment';
import { get } from 'lodash';
import config from '../../config/config';
export const getSentimentData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const recentId = get(selectedItem, 'recentId', null)
    if(!recentId) {
      return
    }
    try {
      dispatch(setIsLoading(true))
      const response = await axios.get(`${config.sentimentUrl}?id=${recentId}`);
      const data = get(response, 'data', []);
      if (response) {
        dispatch(setSentimentResult(data));
      } else {
        dispatch(setSentimentResult(null));
      }
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setSentimentResult(null));
      dispatch(setIsLoading(false))
    }
  };
};
