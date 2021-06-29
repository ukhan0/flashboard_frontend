import { getSearchCombinations, getSelectedSuggestionAsArr, removeDuplicateSuggestions } from './topicHelpers';
import {
  setSelectedSearch,
  setSearchBackdrop,
  setResultsPage,
  setSuggestionsWithSelections,
  setSuggestions,
  setSuggestionsIsLoading,
  setIsTopicDeleteErr,
  setSearchResults,
  setSearchError,
  setSearchStart,
  setIsSaveDlgOpenAndError,
  setIsSaveSearchError,
  setSearchResultHighlights,
  setSearchBackdropHighlights,
  setIsSearchHighlightLoading,
  setIsSearchLoading,
  setSavedSearches,
  setSnackBarActive,
  resetAllSearchParams,
  setShowComposeNew,
  setCurrentSearchtDetail,
  setSelectedCompanyName
} from '../../reducers/Topic';
import axios from 'axios';
import config from '../../config/config';
import { format } from 'date-fns';
import { get, isEmpty, isArray, forEach, concat, uniqBy } from 'lodash';
import documentTypesData from '../../config/documentTypesData';

export const performTopicSearchAggregate = (showBackdrop = false, freshSearch = false) => {
  return async (dispatch, getState) => {
    const currentSearchDetail = {};
    currentSearchDetail.seachText = getState().Topic.searchText;
    currentSearchDetail.startDate = getState().Topic.startDate ? getState().Topic.startDate : null;
    currentSearchDetail.endDate = getState().Topic.endDate ? getState().Topic.endDate : null;
    currentSearchDetail.documentType = getState().Topic.selectedDocumentTypes;
    currentSearchDetail.selectedUniverse = getState().Topic.selectedUniverse;
    dispatch(setCurrentSearchtDetail(currentSearchDetail));
    const cancelTokenSource = axios.CancelToken.source();
    dispatch(setSearchStart());
    if (showBackdrop) {
      dispatch(setSearchBackdrop(cancelTokenSource, true));
    }
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/dictionary/search_aggregate`,
        createSearchPayload(getState().Topic, freshSearch),
        {
          cancelToken: cancelTokenSource.token
        }
      );
      let newSearchResults = get(response, 'data', null);
      if (typeof newSearchResults === 'string') {
        let isErrorr = newSearchResults.includes('root_cause');
        if (isErrorr) {
          dispatch(setSearchBackdrop(null, false));
          dispatch(setSearchError(true));
          let errorMessage =
            'There are too many results for this search. Try refining your search with more specific keywords';
          dispatch(setSnackBarActive(true, 'error', errorMessage));
        }
      }

      if (newSearchResults) {
        const results = get(newSearchResults, 'buckets.companyNames', []);
        if (results) {
          let firstCompanySelected = results[0].key;
          dispatch(setSelectedCompanyName(firstCompanySelected));
        }
        dispatch(setSearchResults(newSearchResults));
        dispatch(setSearchBackdrop(null, false));
      } else {
        dispatch(setSearchBackdrop(null, false));
        dispatch(setSearchError(true));
      }
    } catch (error) {
      dispatch(setSearchBackdrop(null, false));
      dispatch(setSearchError(true));
    }
  };
};

export const performTopicSearchHighlights = (freshSearch = false, companyName = null) => {
  return async (dispatch, getState) => {
    const cancelToken = axios.CancelToken.source();
    const { selectedDocumentTypes, selectedSection } = getState().Topic;
    const topicState = { ...getState().Topic };
    dispatch(setSearchStart());
    if (freshSearch) {
      if (companyName) {
        dispatch(setSearchBackdrop(cancelToken, true));
      } else {
        dispatch(setSearchBackdropHighlights(cancelToken));
      }
    }

    const documentTypeObjects = selectedDocumentTypes.map(sdt => documentTypesData.find(dtd => dtd.value === sdt));

    let searchFromsCount = 0;
    documentTypeObjects.forEach(documentType => {
      const searchFroms = get(documentType, `sections.${selectedSection}`, []);
      searchFroms.forEach(() => {
        searchFromsCount += 1;
      });
    });

    let apiResponseCount = 0;
    for (const documentType of documentTypeObjects) {
      const searchFroms = get(documentType, `sections.${selectedSection}`, []);
      if (getState().Topic.cancelExistingHighlightCalls) {
        // break the loop
        break;
      }
      for (const searchFrom of searchFroms) {
        if (getState().Topic.cancelExistingHighlightCalls) {
          // break the loop
          break;
        }
        try {
          const response = await axios.post(
            `${config.apiUrl}/api/dictionary/search_highlights_by_index`,
            createSearchPayload(topicState, freshSearch, searchFrom, companyName),
            {
              cancelToken: cancelToken.token
            }
          );
          apiResponseCount++;
          let searchResults = get(response, 'data', null);
          const isError = get(searchResults, 'error', null);
          if (searchResults && !isError) {
            const { searchResultHighlights } = getState().Topic;
            const existingData = searchResultHighlights;
            const newData = get(searchResults, 'highlights', []);
            let newSearchResults = concat(existingData, newData);
            newSearchResults = uniqBy(newSearchResults, 'summary_id');
            dispatch(setSearchResultHighlights(newSearchResults));
            dispatch(setSearchBackdropHighlights(cancelToken));
          } else {
            dispatch(setSearchBackdropHighlights(cancelToken));
            dispatch(setSearchError(true));
          }
          if (freshSearch && companyName) {
            dispatch(setSearchBackdrop(null, false));
          }
          if (searchFromsCount === apiResponseCount) {
            dispatch(setIsSearchHighlightLoading(false, null));
          }
        } catch (error) {
          apiResponseCount++;
          dispatch(setSearchError(true));
          dispatch(setSearchBackdropHighlights(cancelToken));
          if (searchFromsCount === apiResponseCount) {
            dispatch(setIsSearchHighlightLoading(false));
          }
          if (freshSearch && companyName) {
            dispatch(setSearchBackdrop(null, false));
          }
        }
      }
    }
  };
};

const createSearchPayload = (topicState, freshSearch, searchFrom = null, companyName = null) => {
  const searchId = get(topicState.selectedSearch, 'searchId', null);
  const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(
    topicState.selectedSuggestions,
    topicState.searchText
  );
  const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : topicState.searchText;
  const data = {
    searchTerm: fullSearchText,
    searchfrom: searchFrom ? `sma_data_json.${searchFrom}` : '',
    startDate: format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss'),
    endDate: format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss'),
    document_types: topicState.selectedDocumentTypes,
    orderBy: topicState.orderBy,
    sortBy: topicState.sortBy,
    page: topicState.pageNo,
    searchId: !freshSearch && searchId && topicState.pageNo === 0 ? searchId : undefined,
    refresh_search: false,
    company_arr: companyName
      ? [companyName]
      : topicState.selectedWatchlistCompanyNames.length
      ? topicState.selectedWatchlistCompanyNames
      : undefined,
    sector: topicState.selectedSector ? topicState.selectedSector : undefined,
    industry_arr: topicState.selectedIndustries.length !== 0 ? topicState.selectedIndustries : undefined
  };
  return data;
};

export const goToNextPage = () => {
  return async (dispatch, getState) => {
    const { pageNo } = getState().Topic;
    dispatch(setResultsPage(pageNo + 1));
    dispatch(performTopicSearchHighlights());
    dispatch(setIsSearchLoading(false));
  };
};

export const fetchTopicsList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async dispatch => {
    const response = await axios.get(`${config.apiUrl}/api/search/list_searches/${user.id}`);
    const savedSearch = get(response, 'data.data', []);

    if (savedSearch.length > 0) {
      dispatch(setSavedSearches(savedSearch));
    } else {
      dispatch(setShowComposeNew(true));
      dispatch(setSavedSearches([]));
    }
  };
};

const createSearchSaveMiniPayload = topicState => {
  const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(
    topicState.selectedSuggestions,
    topicState.searchText
  );
  const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : topicState.searchText;
  return {
    selectedSuggestions: topicState.selectedSuggestions,
    startDate: format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss'),
    endDate: format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss'),
    orderBy: topicState.orderBy,
    sortBy: topicState.sortBy,
    selectedDocumentTypes: topicState.selectedDocumentTypes,
    searchTerm: fullSearchText,
    sector: topicState.selectedSector ? topicState.selectedSector : undefined,
    universe: topicState.selectedUniverse,
    industry_arr: topicState.selectedIndustries.length !== 0 ? topicState.selectedIndustries : undefined,
    company_arr:
      topicState.selectedWatchlistCompanyNames.length !== 0 ? topicState.selectedWatchlistCompanyNames : undefined
  };
};

export const handleSaveSearch = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText } = getState().Topic;
    const payload = {
      userId: user.id,
      searchText: searchText,
      searchJSON: createSearchSaveMiniPayload(getState().Topic)
    };

    try {
      const response = await axios.post(`${config.apiUrl}/api/search/save_search`, payload);
      const responsePayload = get(response, 'data', null);
      if (responsePayload) {
        dispatch(setIsSaveDlgOpenAndError(false, false));
        dispatch(fetchTopicsList());
        dispatch(setSnackBarActive(true, 'success', 'Search Saved successfully'));
      } else {
        dispatch(setIsSaveSearchError(true));
        dispatch(setSnackBarActive(true, 'error', 'Something wroung'));
      }
    } catch (error) {
      dispatch(setIsSaveSearchError(true));
    }
  };
};

export const updateSaveSearch = searchId => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText, searchLabel } = getState().Topic;
    const payload = {
      searchText: searchText,
      searchLabel: searchLabel,
      searchJSON: createSearchSaveMiniPayload(getState().Topic)
    };

    try {
      const response = await axios.put(`${config.apiUrl}/api/search/update_search/${searchId}/${user.id}`, payload);
      const isSuccess = get(response, 'data.data', null);
      if (isSuccess) {
        dispatch(setIsSaveDlgOpenAndError(false, false));
        dispatch(fetchTopicsList());
        dispatch(setSnackBarActive(true, 'success', 'Search updated successfully'));
      } else {
        dispatch(setIsSaveSearchError(true));
        dispatch(setSnackBarActive(true, 'error', 'Search Saved successfully'));
      }
    } catch (error) {
      dispatch(setIsSaveSearchError(true));
    }
  };
};

export const deleteTopic = topicId => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { selectedTopic } = getState().Topic;
    const response = await axios.delete(`${config.apiUrl}/api/topic/${topicId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false);
    if (isDeleted) {
      if (selectedTopic && selectedTopic.topicID === topicId) {
        dispatch(setSelectedSearch(null, null));
      }
      dispatch(fetchTopicsList());
    } else {
      dispatch(setIsTopicDeleteErr(true));
    }
  };
};

export const deleteSearch = searchId => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { selectedSearch } = getState().Topic;
    const response = await axios.delete(`${config.apiUrl}/api/search/delete_search/${searchId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false);
    if (isDeleted) {
      if (selectedSearch && selectedSearch.searchId === searchId) {
        dispatch(setSelectedSearch(null, null));
      }
      dispatch(resetAllSearchParams());
      dispatch(setSnackBarActive(true, 'success', 'Search Deleted successfully'));
      dispatch(fetchTopicsList());
    } else {
      dispatch(setSnackBarActive(true, 'error', 'Something wroung'));
    }
  };
};

export const findSuggestions = () => {
  return async (dispatch, getState) => {
    const { searchText, suggestions, selectedSuggestions } = getState().Topic;
    if (!isEmpty(suggestions) || !searchText) {
      return;
    }
    dispatch(setSuggestionsIsLoading(true));
    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search`, {
        searchTerm: searchText
      });
      const responsePayload = get(response, 'data', null);
      let rawSuggestions = get(responsePayload, 'results', {});
      if (isArray(rawSuggestions) && rawSuggestions.length === 0) {
        rawSuggestions = {};
      }
      // remove duplicated from suggestions
      let newSuggestions = removeDuplicateSuggestions(rawSuggestions);

      let newSelectedSuggestions = {};
      if (isEmpty(selectedSuggestions)) {
        forEach(newSuggestions, (_values, keyWord) => {
          newSelectedSuggestions[keyWord] = [];
        });
        dispatch(setSuggestionsWithSelections(newSuggestions, newSelectedSuggestions));
      } else {
        dispatch(setSuggestions(newSuggestions));
      }
      dispatch(setSuggestionsIsLoading(false));
    } catch (error) {
      dispatch(setSuggestionsIsLoading(false));
    }
  };
};
