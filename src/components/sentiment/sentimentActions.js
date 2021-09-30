import axios from 'axios';
import { setSentimentResult, setIsLoading, setIsApiResponseReceived } from '../../reducers/Sentiment';
import { get, isEmpty } from 'lodash';
import config from '../../config/config';
export const getSentimentData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const { isFromSideBar, searchText, selectedSuggestions } = getState().Topic;
    let selectedSug = [];
    if (!isEmpty(selectedSuggestions)) {
      selectedSug = Object.values(selectedSuggestions);
    }
    const recentId = get(selectedItem, 'recentId', null);
    if (!recentId) {
      return;
    }
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      formData.append(
        'search_term',
        selectedSug.length > 0 ? searchText + ' ' + selectedSug.flat().join(' ') : searchText
      );
      const response = await axios.post(
        `${config.sentimentUrl}?id=${recentId}&es_index=filing_sentiment`,
        isFromSideBar ? '' : formData
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
