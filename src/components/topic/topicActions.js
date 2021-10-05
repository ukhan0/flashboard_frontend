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
  setSelectedCompanyName,
  setOpenTopicSearchDialog,
  isDateSet
} from '../../reducers/Topic';
import axios from 'axios';
import config from '../../config/config';
import { format } from 'date-fns';
import { get, isEmpty, isArray, forEach, concat, uniqBy, orderBy } from 'lodash';
import documentTypesData from '../../config/documentTypesData';
import { metricsSelection } from '../../config/filterTypes';
import moment from 'moment';

export const performTopicSearchAggregate = (showBackdrop = false, freshSearch = false) => {
  return async (dispatch, getState) => {
    const { selectedDocumentTypes, selectedSection } = getState().Topic;
    const currentSearchDetail = {};
    const sltSection = getState().Topic.selectedSection;
    if (sltSection === 'totdoc') {
      currentSearchDetail.selectedSection = null;
    } else {
      const section = metricsSelection.find(sd => sd.key === sltSection);
      if (section) {
        currentSearchDetail.selectedSection = section.label;
      }
    }
    let currentDate = new Date();
    currentSearchDetail.selectedSuggestions = getState().Topic.selectedSuggestions;
    currentSearchDetail.searchLabel = getState().Topic.searchLabel;
    currentSearchDetail.startDate = getState().Topic.isDate
      ? getState().Topic.startDate
        ? getState().Topic.startDate
        : null
      : moment().subtract(12, 'months');
    currentSearchDetail.endDate = getState().Topic.isDate
      ? getState().Topic.endDate
        ? getState().Topic.endDate
        : null
      : currentDate;
    currentSearchDetail.documentType = getState().Topic.selectedDocumentTypes;
    currentSearchDetail.selectedUniverse = getState().Topic.selectedUniverse;
    dispatch(setCurrentSearchtDetail(currentSearchDetail));
    const cancelTokenSource = axios.CancelToken.source();
    dispatch(setSearchStart());
    if (showBackdrop) {
      dispatch(setSearchBackdrop(cancelTokenSource, true));
    }

    const documentTypeObjects = selectedDocumentTypes.map(sdt => documentTypesData.find(dtd => dtd.value === sdt));
    let searchFroms = [];
    documentTypeObjects.forEach(documentType => {
      const sections = get(documentType, `sections.${selectedSection}`, []);
      sections.forEach(section => {
        searchFroms.push(`sma_data_json.${section}`);
      });
    });

    try {
      const response = await axios.post(
        `${config.apiUrl}/api/dictionary/search_aggregate`,
        {
          ...createSearchPayload(getState().Topic, freshSearch),
          searchfromArr: searchFroms,
          searchfrom: undefined
        },
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
          dispatch(setSearchResults({}));
          dispatch(setSearchResultHighlights([]));
          let errorMessage =
            'There are too many results for this search. Try refining your search with more specific keywords';
          dispatch(setSnackBarActive(true, 'error', errorMessage));
        }
      }

      if (newSearchResults) {
        const results = get(newSearchResults, 'buckets.groupByCompanyTicker', []);
        if (results) {
          const companyNameSorter = v => v.key.cn.toLowerCase();
          let sortData = orderBy(results, ['doc_count', companyNameSorter], ['desc', 'asc']);
          let firstCompanySelected = sortData[0].key.cn;
          dispatch(setSelectedCompanyName(firstCompanySelected));
          dispatch(performTopicSearchHighlights(true, firstCompanySelected));
        }
        dispatch(setSearchResults(newSearchResults));
        dispatch(setSearchBackdrop(null, false));
      } else {
        dispatch(isDateSet(false));
        dispatch(setSearchBackdrop(null, false));
        dispatch(setSearchError(true));
        dispatch(setSearchResults({}));
        dispatch(setSearchResultHighlights([]));
      }
    } catch (error) {
      dispatch(isDateSet(false));
      dispatch(setSearchBackdrop(null, false));
      dispatch(setSearchError(true));
      dispatch(setSearchResults({}));
      dispatch(setSearchResultHighlights([]));
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
            dispatch(isDateSet(false));
            const { searchResultHighlights } = getState().Topic;
            const existingData = searchResultHighlights;
            const newData = get(searchResults, 'highlights', []);
            let newSearchResults = concat(existingData, newData);
            newSearchResults = uniqBy(newSearchResults, 'summary_id');
            dispatch(setSearchResultHighlights(newSearchResults));
            dispatch(setSearchBackdropHighlights(cancelToken));
          } else {
            dispatch(isDateSet(false));
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
          dispatch(isDateSet(false));
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
  const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText);
  const fullSearchText = onlySuggestionSingleArr.length
    ? `${topicState.searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
    : topicState.searchText;
  const data = {
    searchTerm: fullSearchText,
    searchfrom: searchFrom ? `sma_data_json.${searchFrom}` : '',
    startDate: topicState.isDate
      ? format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss')
      : moment()
          .subtract(12, 'months')
          .format('YYYY-MM-DD HH:mm:ss'),

    endDate: topicState.isDate
      ? format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss')
      : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
      dispatch(setOpenTopicSearchDialog(true));
      dispatch(setSearchResults({}));
      dispatch(setSearchResultHighlights([]));
      dispatch(setCurrentSearchtDetail({}));
    }
  };
};

const createSearchSaveMiniPayload = topicState => {
  const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(
    topicState.selectedSuggestions,
    topicState.searchText
  );
  const documentTypeObjects = topicState.selectedDocumentTypes.map(sdt =>
    documentTypesData.find(dtd => dtd.value === sdt)
  );
  let searchFroms = [];
  documentTypeObjects.forEach(documentType => {
    const sections = get(documentType, `sections.${topicState.selectedSection}`, []);
    sections.forEach(section => {
      searchFroms.push(`sma_data_json.${section}`);
    });
  });
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
    section: topicState.selectedSection,
    searchFrom: searchFroms,
    industry_arr: topicState.selectedIndustries.length !== 0 ? topicState.selectedIndustries : undefined,
    company_arr:
      topicState.selectedWatchlistCompanyNames.length !== 0 ? topicState.selectedWatchlistCompanyNames : undefined
  };
};

export const handleSaveSearch = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText, isTopicEmailAlertEnable, searchLabel } = getState().Topic;
    const payload = {
      userId: user.id,
      searchText: searchText,
      searchJSON: createSearchSaveMiniPayload(getState().Topic),
      send_topic_alert_email: isTopicEmailAlertEnable,
      searchLabel: searchLabel
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
    const { searchText, searchLabel, isTopicEmailAlertEnable } = getState().Topic;
    const payload = {
      searchText: searchText,
      searchLabel: searchLabel,
      searchJSON: createSearchSaveMiniPayload(getState().Topic),
      send_topic_alert_email: isTopicEmailAlertEnable
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
        let oneValueArray = [];
        forEach(newSuggestions, (values, keyWord) => {
          newSelectedSuggestions[keyWord] = [];
          if (values.length === 1) {
            oneValueArray.push(values[0]);
            delete newSuggestions[keyWord];
          }
        });
        if (oneValueArray.length > 0) {
          newSuggestions['May be of interest'] = oneValueArray;
          newSelectedSuggestions['May be of interest'] = [];
        }
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
