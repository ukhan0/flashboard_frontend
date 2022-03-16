import axios from 'axios';
import { setSentimentResult, setIsLoading, setSentimentHighlights, setCanceHighlightsCall } from '../../reducers/Sentiment';

import { setFillingsSearchText } from '../../reducers/Filings';
import { get } from 'lodash';

import config from '../../config/config';
import { getSelectedSuggestionAsArr, getSearchText } from '../topic/topicHelpers';

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
      ? fillingsSearchText
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
        `${config.sentimentUrl}?id=${recentId}&es_index=${isFromThemex ? sentimentSearchIndex : (selectedType === "global") ? 'fillings_*' : 'fillings_*'}`,
        isFromSideBar ? '' : formData
      );
      const data = get(response, 'data', []);
      if (response) {
        dispatch(setSentimentResult(data, recentId));
        dispatch(setFillingsSearchText(''));
      } else {
        dispatch(setSentimentResult(null));
        dispatch(setFillingsSearchText(''));
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setSentimentResult(null));
      dispatch(setFillingsSearchText(''));
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
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd
    } = getState().Topic;

    const documentId = get(selectedItem, 'documentId', null);
    if (!documentId) {
      return;
    }

    const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(selectedSuggestions, searchText);

    let searchTerm = getSearchText(
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd,
      onlySuggestionSingleArr,
      searchText,
      isSimpleSearch
    );
    try {
      const cancelToken = axios.CancelToken.source();
      dispatch(setCanceHighlightsCall(cancelToken));
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search_by_document_id`, {
        searchTerm: isFromSideBar ? '' : `${searchTerm}`,
        document_id: documentId,
        orderBy: 'desc',
        sortBy: 'document_date',
        page: 0,
        searchIndex: searchIndex['value'],
        cancelToken: cancelToken.token
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
