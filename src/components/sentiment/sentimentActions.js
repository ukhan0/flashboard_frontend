import axios from 'axios';
import {
  setSentimentResult,
  setIsLoading,
  setIsApiResponseReceived,
  setSentimentHighlights
} from '../../reducers/Sentiment';
import { get, isEmpty } from 'lodash';
import config from '../../config/config';
import { getSearchCombinations, getSelectedSuggestionAsArr } from '../topic/topicHelpers';

export const getSentimentData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const {
      isFromSideBar,
      searchText,
      selectedSuggestions,
      isSimpleSearch,
      simpleSearchTextArray
    } = getState().Topic;
    const searchTerm = isSimpleSearch ? simpleSearchTextArray.map(value => `"${value}"`).join(' OR ') : searchText;
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
      formData.append('search_term', selectedSug.length > 0 ? fullSearchText : `"${searchTerm}"`);
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

export const getSentimentHighlights = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const {
      isFromSideBar,
      searchText,
      selectedSuggestions,
      searchIndex,
      isSimpleSearch,
      simpleSearchTextArray
    } = getState().Topic;
    const searchTerm = isSimpleSearch ? simpleSearchTextArray.map(value => `"${value}"`).join(' OR ') : searchText;
    let selectedSug = [];
    if (!isEmpty(selectedSuggestions)) {
      selectedSug = Object.values(selectedSuggestions);
    }
    const documentId = get(selectedItem, 'documentId', null);
    if (!documentId) {
      return;
    }

    const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(selectedSuggestions, searchText);

    const fullSearchText = onlySuggestionSingleArr.length
      ? `${searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
      : searchText;
    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search_by_document_id`, {
        searchTerm: isFromSideBar ? '' : `${selectedSug.length > 0 ? fullSearchText : searchTerm}`,
        document_id: documentId,
        orderBy: 'desc',
        sortBy: 'document_date',
        page: 0,
        searchIndex: searchIndex
      });

      const data = get(response, 'data', {});

      if (response) {
        let highlightRaw = data.highlights.map(v => v.results);
        let highlights = highlightRaw
          .flat()
          .map(v => v.content)
          .flat();
        dispatch(setSentimentHighlights(highlights));
      } else {
        dispatch(setSentimentHighlights([]));
      }
    } catch (error) {
      dispatch(setSentimentHighlights([]));
    }
  };
};
