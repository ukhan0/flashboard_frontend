import {
  getSearchCombinations,
  getSelectedSuggestionAsArr,
  removeDuplicateSuggestions,
  deleteSearchSuggestionsByKey
} from './topicHelpers';
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
  setIsSearchLoading,
  setSavedSearches,
  setSnackBarActive,
  resetAllSearchParams,
  setShowComposeNew,
  setCurrentSearchtDetail,
  setSelectedCompanyName,
  setOpenTopicSearchDialog,
  isDateSet,
  setTweetsData,
  setTweetsMapData
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
    const {
      selectedDocumentTypes,
      selectedSection,
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd,
      isSimpleSearch,
      searchText
    } = getState().Topic;
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
    const startDate = new URLSearchParams(window.location.search).get('startDate');
    const endDate = new URLSearchParams(window.location.search).get('endDate');
    let currentDate = new Date();
    const value1 = simpleSearchTextArray.map(value => `"${value}"`).join(' OR ');
    const value = ignoreSearchTextArray.map(value => `-"${value}"`).join(' AND ');
    const value2 = searchTextWithAnd.map(value => `"${value}"`).join(' AND ');
    currentSearchDetail.searchTerm = isSimpleSearch ? `${value1} ${value2} ${value}` : searchText;
    currentSearchDetail.selectedSuggestions = getState().Topic.selectedSuggestions;
    currentSearchDetail.searchLabel = getState().Topic.searchLabel;
    currentSearchDetail.startDate = startDate
      ? startDate && getState().Topic.isDate
        ? getState().Topic.isDate
          ? getState().Topic.startDate
            ? getState().Topic.startDate
            : null
          : moment().subtract(12, 'months')
        : startDate
      : getState().Topic.isDate
      ? getState().Topic.startDate
        ? getState().Topic.startDate
        : null
      : moment().subtract(12, 'months');

    currentSearchDetail.endDate = endDate
      ? endDate && getState().Topic.isDate
        ? getState().Topic.isDate
          ? getState().Topic.endDate
            ? getState().Topic.endDate
            : null
          : currentDate
        : endDate
      : getState().Topic.isDate
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
    if (!getState().Topic.selectedDocumentTypes.length === getState().Topic.documentTypes.length) {
      documentTypeObjects.forEach(documentType => {
        const sections = get(documentType, `sections.${selectedSection}`, []);
        sections.forEach(section => {
          searchFroms.push(`sma_data_json.${section}`);
        });
      });
    }
    if (getState().Topic.searchIndex === 'tweets') {
      return;
    }
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

    const topicState = { ...getState().Topic };
    dispatch(setSearchStart());
    if (freshSearch) {
      if (companyName) {
        dispatch(setSearchBackdrop(cancelToken, true));
      } else {
        dispatch(setSearchBackdropHighlights(cancelToken));
      }
    }

    try {
      const response = await axios.post(
        `${config.apiUrl}/api/dictionary/search_highlights_by_index`,
        createSearchPayload(topicState, freshSearch, '', companyName),
        {
          cancelToken: cancelToken.token
        }
      );

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
    } catch (error) {
      dispatch(isDateSet(false));
      dispatch(setSearchError(true));
      dispatch(setSearchBackdropHighlights(cancelToken));

      if (freshSearch && companyName) {
        dispatch(setSearchBackdrop(null, false));
      }
    }
  };
};

const createSearchPayload = (topicState, freshSearch, searchFrom = null, companyName = null) => {
  const searchId = get(topicState.selectedSearch, 'searchId', null);
  const startDate = new URLSearchParams(window.location.search).get('startDate');
  const endDate = new URLSearchParams(window.location.search).get('endDate');
  const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText);
  const value1 = topicState.simpleSearchTextArray.map(value => `"${value}"`).join(' OR ');
  const value = topicState.ignoreSearchTextArray.map(value => `-"${value}"`).join(' AND ');
  const value2 = topicState.searchTextWithAnd.map(value => `"${value}"`).join(' AND ');
  const searchText = `(${value1})${value2.length > 0 ? `AND(${value2})` : ''}${
    value.length > 0 ? `AND(${value})` : ''
  }`;
  const fullSearchText = onlySuggestionSingleArr.length
    ? `${topicState.searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
    : topicState.searchText;
  const data = {
    searchTerm: topicState.isSimpleSearch ? searchText : fullSearchText,
    searchfrom: searchFrom ? `sma_data_json.${searchFrom}` : '',
    startDate: startDate
      ? startDate && topicState.isDate
        ? topicState.isDate
          ? format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss')
          : moment()
              .subtract(12, 'months')
              .format('YYYY-MM-DD HH:mm:ss')
        : startDate
      : topicState.isDate
      ? format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss')
      : moment()
          .subtract(12, 'months')
          .format('YYYY-MM-DD HH:mm:ss'),

    endDate: endDate
      ? endDate && topicState.isDate
        ? topicState.isDate
          ? format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss')
          : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        : endDate
      : topicState.isDate
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
    industry_arr: topicState.selectedIndustries.length !== 0 ? topicState.selectedIndustries : undefined,
    searchIndex: topicState.searchIndex
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
    searchTextWithAnd: !topicState.isSimpleSearch ? [] : topicState.searchTextWithAnd,
    simpleSearchTextArray: !topicState.isSimpleSearch ? [] : topicState.simpleSearchTextArray,
    ignoreSearchTextArray: !topicState.isSimpleSearch ? [] : topicState.ignoreSearchTextArray,
    isSimpleSearch: topicState.isSimpleSearch,
    industry_arr: topicState.selectedIndustries.length !== 0 ? topicState.selectedIndustries : undefined,
    company_arr:
      topicState.selectedWatchlistCompanyNames.length !== 0 ? topicState.selectedWatchlistCompanyNames : undefined,
    searchIndex: topicState.searchIndex
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
    const { searchText, suggestions, selectedSuggestions, isSimpleSearch, simpleSearchTextArray } = getState().Topic;
    let searchSug = '';
    if ((isSimpleSearch && simpleSearchTextArray.length < 0) || !isEmpty(suggestions) || !searchText) {
      return;
    }

    if (simpleSearchTextArray.length > 0 && isSimpleSearch) {
      searchSug = simpleSearchTextArray.join(' ');
    }
    dispatch(setSuggestionsIsLoading(true));

    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search`, {
        searchTerm: isSimpleSearch ? searchSug : searchText
      });
      const responsePayload = get(response, 'data', null);
      let rawSuggestions = get(responsePayload, 'results', {});
      if (isArray(rawSuggestions) && rawSuggestions.length === 0) {
        rawSuggestions = {};
      }

      // remove duplicated from suggestions
      let deleteValues = isSimpleSearch ? simpleSearchTextArray : searchText;
      let deleteKeys = ['or', 'OR', 'and', 'and/or'];
      let newSuggestions = deleteSearchSuggestionsByKey(
        removeDuplicateSuggestions(rawSuggestions),
        deleteKeys,
        deleteValues
      );

      let filterNewSuggestions = {};

      forEach(newSuggestions, (v, k) => {
        let filteredData = v.filter(
          item => item.indexOf('https') === -1 && item.indexOf(')') === -1 && item.indexOf('#') === -1
        );

        filterNewSuggestions[k] = filteredData.length > 0 ? filteredData : [];
      });

      let newSelectedSuggestions = {};
      if (isEmpty(selectedSuggestions)) {
        let oneValueArray = [];
        forEach(filterNewSuggestions, (values, keyWord) => {
          if (values.length > 0) {
            newSelectedSuggestions[keyWord] = [];
          } else {
            delete filterNewSuggestions[keyWord];
          }
          if (values.length === 1) {
            oneValueArray.push(values[0]);
            delete filterNewSuggestions[keyWord];
          }
        });
        if (oneValueArray.length > 0) {
          filterNewSuggestions['May be of interest'] = oneValueArray;
          newSelectedSuggestions['May be of interest'] = [];
        }

        dispatch(setSuggestionsWithSelections(filterNewSuggestions, newSelectedSuggestions));
      } else {
        let oneValueArray = [];
        forEach(filterNewSuggestions, (values, keyWord) => {
          if (values.length === 0) {
            delete filterNewSuggestions[keyWord];
          }
          if (values.length === 1) {
            oneValueArray.push(values[0]);
            delete filterNewSuggestions[keyWord];
          }
        });
        if (oneValueArray.length > 0) {
          filterNewSuggestions['May be of interest'] = oneValueArray;
        }

        dispatch(setSuggestions(filterNewSuggestions));
      }
      dispatch(setSuggestionsIsLoading(false));
    } catch (error) {
      dispatch(setSuggestionsIsLoading(false));
    }
  };
};
export const perfomeSearchPayloadTweets = (showBackdrop = false, freshSearch = false, tweetsUrl, isMapData) => {
  return async (dispatch, getState) => {
    const {
      selectedDocumentTypes,
      selectedSection,
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd,
      isSimpleSearch,
      searchText
    } = getState().Topic;
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
    const startDate = new URLSearchParams(window.location.search).get('startDate');
    const endDate = new URLSearchParams(window.location.search).get('endDate');
    let currentDate = new Date();
    const value1 = simpleSearchTextArray.map(value => `"${value}"`).join(' OR ');
    const value = ignoreSearchTextArray.map(value => `-"${value}"`).join(' AND ');
    const value2 = searchTextWithAnd.map(value => `"${value}"`).join(' AND ');
    currentSearchDetail.searchTerm = isSimpleSearch ? `${value1} ${value2} ${value}` : searchText;
    currentSearchDetail.selectedSuggestions = getState().Topic.selectedSuggestions;
    currentSearchDetail.searchLabel = getState().Topic.searchLabel;
    currentSearchDetail.startDate = startDate
      ? startDate && getState().Topic.isDate
        ? getState().Topic.isDate
          ? getState().Topic.startDate
            ? getState().Topic.startDate
            : null
          : moment().subtract(12, 'months')
        : startDate
      : getState().Topic.isDate
      ? getState().Topic.startDate
        ? getState().Topic.startDate
        : null
      : moment().subtract(12, 'months');

    currentSearchDetail.endDate = endDate
      ? endDate && getState().Topic.isDate
        ? getState().Topic.isDate
          ? getState().Topic.endDate
            ? getState().Topic.endDate
            : null
          : currentDate
        : endDate
      : getState().Topic.isDate
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
    if (!getState().Topic.selectedDocumentTypes.length === getState().Topic.documentTypes.length) {
      documentTypeObjects.forEach(documentType => {
        const sections = get(documentType, `sections.${selectedSection}`, []);
        sections.forEach(section => {
          searchFroms.push(`sma_data_json.${section}`);
        });
      });
    }
    if (getState().Topic.searchIndex === 'tweets') {
      try {
        const response = await axios.post(
          `${config.apiUrl}${tweetsUrl}`,
          {
            ...createSearchPayloadTweets(getState().Topic, freshSearch)
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
            let errorMessage =
              'There are too many results for this search. Try refining your search with more specific keywords';
            dispatch(setSnackBarActive(true, 'error', errorMessage));
          }
          return;
        }

        if (newSearchResults.data) {
          isMapData
            ? dispatch(setTweetsMapData(newSearchResults.buckets.profileLocationAgg))
            : dispatch(setTweetsData(newSearchResults.data));

          dispatch(setSearchBackdrop(null, false));
        } else {
          dispatch(isDateSet(false));
          dispatch(setSearchBackdrop(null, false));
          dispatch(setSearchError(true));
          isMapData ? dispatch(setTweetsMapData([])) : dispatch(setTweetsData([]));
        }
      } catch (error) {
        dispatch(isDateSet(false));
        dispatch(setSearchBackdrop(null, false));
        dispatch(setSearchError(true));
        isMapData ? dispatch(setTweetsMapData([])) : dispatch(setTweetsData([]));
      }
    }
  };
};
const createSearchPayloadTweets = (topicState, freshSearch) => {
  const startDate = new URLSearchParams(window.location.search).get('startDate');
  const endDate = new URLSearchParams(window.location.search).get('endDate');
  const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText);
  const value1 = topicState.simpleSearchTextArray.map(value => `"${value}"`).join(' OR ');
  const value = topicState.ignoreSearchTextArray.map(value => `-"${value}"`).join(' AND ');
  const value2 = topicState.searchTextWithAnd.map(value => `"${value}"`).join(' AND ');
  const searchText = `(${value1})${value2.length > 0 ? `AND(${value2})` : ''}${
    value.length > 0 ? `AND(${value})` : ''
  }`;
  const fullSearchText = onlySuggestionSingleArr.length
    ? `${topicState.searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
    : topicState.searchText;
  const data = {
    searchTerm: topicState.isSimpleSearch ? searchText : fullSearchText,

    startDate: startDate
      ? startDate && topicState.isDate
        ? topicState.isDate
          ? format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss')
          : moment()
              .subtract(12, 'months')
              .format('YYYY-MM-DD HH:mm:ss')
        : startDate
      : topicState.isDate
      ? format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss')
      : moment()
          .subtract(12, 'months')
          .format('YYYY-MM-DD HH:mm:ss'),

    endDate: endDate
      ? endDate && topicState.isDate
        ? topicState.isDate
          ? format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss')
          : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        : endDate
      : topicState.isDate
      ? format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss')
      : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    // orderBy: topicState.orderBy,
    page: topicState.pageNo,
    refresh_search: false,
    searchIndex: topicState.searchIndex,
    document_type: '',
    ticker: ''
  };
  return data;
};
