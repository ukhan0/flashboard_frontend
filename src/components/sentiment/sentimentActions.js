import axios from 'axios';
import { setSentimentResult, setIsLoading, setIsApiResponseReceived } from '../../reducers/Sentiment';
import { get, isEmpty } from 'lodash';
import config from '../../config/config';
import { getSearchCombinations, getSelectedSuggestionAsArr } from '../topic/topicHelpers';

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

    const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(selectedSuggestions, searchText);

    const fullSearchText = onlySuggestionSingleArr.length
      ? `${searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
      : searchText;
    // console.log(fullSearchText,"text")
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      formData.append('search_term', selectedSug.length > 0 ? fullSearchText : searchText);
      const response = await axios.post(
        `${config.sentimentUrl}?id=${recentId}&es_index=filling_sentiment4`,
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
