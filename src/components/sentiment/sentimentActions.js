import axios from 'axios';
import { setSentimentResult, setIsLoading, setIsApiResponseReceived } from '../../reducers/Sentiment';
import { get } from 'lodash';
import config from '../../config/config';
export const getSentimentData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const { searchText, isFromSideBar } = getState().Topic;
    const recentId = get(selectedItem, 'recentId', null);
    if (!recentId) {
      return;
    }
    try {
      dispatch(setIsLoading(true));
      const response = await axios.get(
        `${config.sentimentUrl}?id=${recentId}&es_index=filling_embedded_headings${
          isFromSideBar ? '' : `&search_term=${searchText}`
        }`
      );
      const data = get(response, 'data', []);
      if (response) {
        dispatch(setIsApiResponseReceived(true));
        dispatch(setSentimentResult(data));
      } else {
        dispatch(setSentimentResult(null));
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setSentimentResult(null));
      dispatch(setIsLoading(false));
    }
  };
};
