import axios from 'axios';
import {
  setSentimentResult,
  setIsLoading,
} from '../../reducers/Sentiment';

import { setFillingsSearchText } from '../../reducers/Filings';
import { get } from 'lodash';
// import SentimentDummyData from './dummySentimentData'
import config from '../../config/config';
import { getSelectedSuggestionAsArr, getSearchText } from '../topic/topicHelpers';
import { getSearchIndex } from '../sentiment/SentimentHelpers';

export const getSentimentData = () => {
  return async (dispatch, getState) => {
    const { selectedItem, selectedType } = getState().Watchlist;
    const { isFromThemex } = getState().Topic;
    const { fillingsSearchText } = getState().Filings;
    const { sentimentSearchIndex } = getState().Sentiment;

    const {
      isFromSideBar,
      searchText,
      selectedSuggestions,
      isSimpleSearch,
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd
    } = getState().Topic;
    const recentId = get(selectedItem, 'recentId', null);
    if (!recentId) {
      return;
    }
    const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(selectedSuggestions, searchText);
    let searchTerm = fillingsSearchText
      ? `"${fillingsSearchText}"`
      : getSearchText(
        simpleSearchTextArray,
        ignoreSearchTextArray,
        searchTextWithAnd,
        onlySuggestionSingleArr,
        searchText,
        isSimpleSearch
      );
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      if (searchTerm.length > 2) {
        formData.append('search_term', searchTerm);
      }
      const response = await axios.post(
        `${config.sentimentUrl}?id=${recentId}&es_index=${getSearchIndex(
          isFromThemex,
          sentimentSearchIndex,
          selectedType,
          selectedItem
        )}`,
        isFromSideBar ? '' : formData
      );
      const data = get(response, 'data', []);

      // const data = SentimentDummyData;

      if (data) {
        dispatch(setSentimentResult(data, recentId));
        dispatch(setFillingsSearchText(''));
      } else {
        dispatch(setSentimentResult(null, null));
        dispatch(setFillingsSearchText(''));
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setSentimentResult(null, null));
      dispatch(setFillingsSearchText(''));
      dispatch(setIsLoading(false));
    }
  };
};
