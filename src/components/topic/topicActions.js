import {
  getSearchCombinations,
  getSelectedSuggestionAsArr,
  removeDuplicateSuggestions,
  deleteSearchSuggestionsByKey,
  getSearchText,
  getCurrentSearchDispaly,
  getDocTypes
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
  setSearchResultHighlights,
  setSearchBackdropHighlights,
  setIsSearchLoading,
  setSavedSearches,
  setSnackBarActive,
  setCurrentSearchtDetail,
  setSelectedCompanyName,
  setOpenTopicSearchDialog,
  isDateSet,
  setTweetsData,
  setTweetsMapData,
  setTweetsCountryMapData,
  setTweetsCountryStatesMapData,
  setTweetsTableData,
  setAllSearchParams,
  setIsnNewlySavedSearch,
  setTopicSearchCompany,
  setTwitterData,
  setTwitterMapData,
  setTwitterFetchData
} from '../../reducers/Topic';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import axios from 'axios';
import config from '../../config/config';
import { format } from 'date-fns';
import { get, isEmpty, isArray, forEach, concat, uniqBy, orderBy } from 'lodash';
import documentTypesData from '../../config/documentTypesData';
import { metricsSelection } from '../../config/filterTypes';
import moment from 'moment';
import { searchSuggestionTypeConfig } from '../../config/appConfig';
import { setSnackBarObj } from '../../reducers/Alerts';

export const performTopicSearchAggregate = (showBackdrop = false, freshSearch = false, historyBy = 'month') => {
  return async (dispatch, getState) => {
    const {
      // selectedDocumentTypes,
      // selectedSection,
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd,
      isSimpleSearch,
      searchText
    } = getState().Topic;
    dispatch(setTopicSearchCompany(''));
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
    const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(getState().Topic.selectedSuggestions, searchText);
    currentSearchDetail.searchTerm = getCurrentSearchDispaly(
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd,
      onlySuggestionSingleArr,
      searchText,
      isSimpleSearch
    );

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
    if (getState().Topic.searchIndex['id'] === 4 || getState().Topic.searchIndex['id'] === 5) {
      return;
    }
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/dictionary/search_aggregate`,
        {
          ...createSearchPayload(getState().Topic, freshSearch),
          searchfrom: undefined,
          historyBy: historyBy
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
          let firstCompanyData = {
            companyName: sortData[0].key.cn,
            ticker: sortData[0].key.ct ? sortData[0].key.ct : '',
            companyId: sortData[0].key.cid ? sortData[0].key.cid : ''
          };
          dispatch(setSelectedWatchlist(firstCompanyData));
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
  // const startDate = new URLSearchParams(window.location.search).get('startDate');
  // const endDate = new URLSearchParams(window.location.search).get('endDate');
  const startTime = new URLSearchParams(window.location.search).get('startTime');
  const endTime = new URLSearchParams(window.location.search).get('endTime');
  const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText);
  const data = {
    searchTerm: getSearchText(
      topicState.simpleSearchTextArray,
      topicState.ignoreSearchTextArray,
      topicState.searchTextWithAnd,
      onlySuggestionSingleArr,
      topicState.searchText,
      topicState.isSimpleSearch
    ),
    searchfrom: searchFrom ? `sma_data_json.${searchFrom}` : '',
    startDate: startTime
      ? undefined
      : topicState.isDate
      ? format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss')
      : moment()
          .subtract(12, 'months')
          .format('YYYY-MM-DD HH:mm:ss'),

    endDate: endTime
      ? undefined
      : topicState.isDate
      ? format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss')
      : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    document_types: getDocTypes(topicState.selectedDocumentTypes, documentTypesData),
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
    searchIndex: topicState.searchIndex ? topicState.searchIndex['value'] : undefined,
    startTime: startTime ? startTime : undefined,
    endTime: endTime ? endTime : undefined,
    countryCode: topicState.selectedCountry ? topicState.selectedCountry['code'] : undefined
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
  return async (dispatch, getState) => {
    const { isNewlySavedSearch } = getState().Topic;
    const response = await axios.get(`${config.apiUrl}/api/search/list_searches/${user.id}`);
    const savedSearch = get(response, 'data.data', []);
    if (savedSearch.length > 0) {
      if (isNewlySavedSearch) {
        dispatch(setSelectedSearch(savedSearch[savedSearch.length - 1]));
        dispatch(setAllSearchParams(savedSearch[savedSearch.length - 1]));
      }
      dispatch(setSavedSearches(savedSearch));
      dispatch(setIsnNewlySavedSearch(false));
    } else {
      dispatch(setSavedSearches([]));
      dispatch(setOpenTopicSearchDialog(true));
      dispatch(setSearchResults({}));
      dispatch(setSearchResultHighlights([]));
      dispatch(setCurrentSearchtDetail({}));
      dispatch(setIsnNewlySavedSearch(false));
    }
  };
};

const createSearchSaveMiniPayload = topicState => {
  const { suggestionsArr, suggestionsSingleArr, onlySuggestionSingleArr } = getSelectedSuggestionAsArr(
    topicState.selectedSuggestions,
    topicState.searchText
  );
  // const documentTypeObjects = topicState.selectedDocumentTypes.map(sdt =>
  //   documentTypesData.find(dtd => dtd.value === sdt)
  // );
  let searchFroms = [];
  // documentTypeObjects.forEach(documentType => {
  //   const sections = get(documentType, `sections.${topicState.selectedSection}`, []);
  //   sections.forEach(section => {
  //     searchFroms.push(`sma_data_json.${section}`);
  //   });
  // });

  const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : topicState.searchText;
  return {
    selectedSuggestions: topicState.selectedSuggestions,
    searchedText: getSearchText(
      topicState.simpleSearchTextArray,
      topicState.ignoreSearchTextArray,
      topicState.searchTextWithAnd,
      onlySuggestionSingleArr,
      topicState.searchText,
      topicState.isSimpleSearch
    ),
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
    searchIndex: topicState.searchIndex ? topicState.searchIndex : undefined,
    countryCode: topicState.selectedCountry ? topicState.selectedCountry : undefined
  };
};

export const handleSaveSearch = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText, isTopicEmailAlertEnable, searchLabel, searchIndex } = getState().Topic;
    dispatch(setIsnNewlySavedSearch(true));
    const payload = {
      userId: user.id,
      searchText: searchText,
      searchJSON: createSearchSaveMiniPayload(getState().Topic),
      // email alert false for tweets and twitter
      send_topic_alert_email: searchIndex['id'] !== 4 && searchIndex['id'] !== 5 ? isTopicEmailAlertEnable : false,
      searchLabel: searchLabel
    };

    try {
      const response = await axios.post(`${config.apiUrl}/api/search/save_search`, payload);
      const responsePayload = get(response, 'data', null);
      if (responsePayload) {
        dispatch(fetchTopicsList());
        dispatch(setSnackBarActive(true, 'success', 'Search Saved successfully'));
      } else {
        dispatch(setSnackBarActive(true, 'error', 'Something wroung'));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateSaveSearch = searchId => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText, searchLabel, isTopicEmailAlertEnable, searchIndex } = getState().Topic;
    const payload = {
      searchText: searchText,
      searchLabel: searchLabel,
      searchJSON: createSearchSaveMiniPayload(getState().Topic),
      // email alert false for tweets and twitter
      send_topic_alert_email: searchIndex['id'] !== 4 && searchIndex['id'] !== 5 ? isTopicEmailAlertEnable : false
    };

    try {
      const response = await axios.put(`${config.apiUrl}/api/search/update_search/${searchId}/${user.id}`, payload);
      const isSuccess = get(response, 'data.data', null);
      if (isSuccess) {
        dispatch(fetchTopicsList());
        dispatch(setSnackBarActive(true, 'success', 'Search updated successfully'));
      } else {
        dispatch(setSnackBarActive(true, 'error', 'Search Saved successfully'));
      }
    } catch (error) {
      console.log(error);
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
  return async dispatch => {
    const response = await axios.delete(`${config.apiUrl}/api/search/delete_search/${searchId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false);
    if (isDeleted) {
      dispatch(setSnackBarActive(true, 'success', 'Search Deleted successfully'));
      dispatch(fetchTopicsList());
    } else {
      dispatch(setSnackBarActive(true, 'error', 'Something wroung'));
    }
  };
};

export const findSuggestions = () => {
  return async (dispatch, getState) => {
    const {
      searchText,
      suggestions,
      selectedSuggestions,
      isSimpleSearch,
      simpleSearchTextArray,
      searchSuggestionType,
      searchTextWithAnd,
      ignoreSearchTextArray
    } = getState().Topic;

    let simpleSearchArray = [];

    if (searchSuggestionType === searchSuggestionTypeConfig.searchTextWithAnd) {
      simpleSearchArray = searchTextWithAnd;
    } else if (searchSuggestionType === searchSuggestionTypeConfig.ignoreSearchTextArray) {
      simpleSearchArray = ignoreSearchTextArray;
    } else {
      simpleSearchArray = simpleSearchTextArray;
    }

    let searchSug = '';

    if (isSimpleSearch) {
      searchSug = simpleSearchArray.length > 0 ? simpleSearchArray.join(' ') : [];
    } else {
      searchSug = searchText;
    }
    if (!isEmpty(suggestions) || !searchSug) {
      return;
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
      let deleteValues = isSimpleSearch ? simpleSearchArray : searchText;
      let deleteKeys = ['or', 'OR', 'and', 'and/or'];
      let newSuggestions = deleteSearchSuggestionsByKey(
        removeDuplicateSuggestions(rawSuggestions),
        deleteKeys,
        deleteValues
      );

      let filterNewSuggestions = {};

      forEach(newSuggestions, (v, k) => {
        let filteredData = v.filter(
          item =>
            item.indexOf('https') === -1 &&
            item.indexOf(')') === -1 &&
            item.indexOf('#') === -1 &&
            item.indexOf('http') === -1
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
export const performTopicTweetsSearchAggregate = (showBackdrop = false, freshSearch = false, ticker = '') => {
  return async (dispatch, getState) => {
    const {
      // selectedDocumentTypes,
      // selectedSection,
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
    const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(getState().Topic.selectedSuggestions, searchText);
    currentSearchDetail.searchTerm = getCurrentSearchDispaly(
      simpleSearchTextArray,
      ignoreSearchTextArray,
      searchTextWithAnd,
      onlySuggestionSingleArr,
      searchText,
      isSimpleSearch
    );
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
    if (getState().Topic.searchIndex['id'] === 4) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/api/dictionary/search_tweets_data`,
          {
            ...createSearchPayloadTweets(getState().Topic, freshSearch),
            ticker: ticker
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
          if (freshSearch) {
            dispatch(setTweetsMapData(newSearchResults.buckets.profileCountryCode));
            dispatch(setTweetsCountryStatesMapData(newSearchResults.buckets.groupProfileCountryRegion));
            dispatch(setTweetsTableData(newSearchResults.buckets.topicNames));
            dispatch(setTweetsData(newSearchResults.data));
          } else {
            dispatch(setTweetsData(newSearchResults.data));
          }
          dispatch(setSearchBackdrop(null, false));
        } else {
          dispatch(isDateSet(false));
          dispatch(setSearchBackdrop(null, false));
          dispatch(setSearchError(true));
          dispatch(setTweetsMapData([]));
          dispatch(setTweetsData([]));
          dispatch(setTweetsCountryStatesMapData([]));
          dispatch(setTweetsTableData([]));
        }
      } catch (error) {
        dispatch(isDateSet(false));
        dispatch(setSearchBackdrop(null, false));
        dispatch(setSearchError(true));
        dispatch(setTweetsMapData([]));
        dispatch(setTweetsData([]));
        dispatch(setTweetsCountryStatesMapData([]));
        dispatch(setTweetsTableData([]));
      }
    }

    if (getState().Topic.searchIndex['id'] === 5) {
      try {
        const { user } = getState().User;
        const response = await axios.post(
          `${config.apiUrl}/api/dictionary/search_twitter_data`,
          {
            ...createSearchPayloadTwitter(getState().Topic, freshSearch),
            userId: user.id
          },
          {
            cancelToken: cancelTokenSource.token
          }
        );
        let newSearchResults = get(response, 'data', null);
        if (newSearchResults.error) {
          let isErrorr = newSearchResults.error;
          if (isErrorr) {
            dispatch(setSearchBackdrop(null, false));
            dispatch(setSearchError(true));
            let errorMessage = get(
              response,
              'data.data.error.message',
              'There are too many results for this search. Try refining your search with more specific keywords.'
            );
            dispatch(setSnackBarObj({ message: errorMessage, severity: 'error', autoHideDuration: null }));
            dispatch(setTwitterFetchData(true));
          }
          return;
        }

        if (newSearchResults.data) {
          dispatch(setTwitterMapData(Object.entries(newSearchResults.countryCount)));
          dispatch(setTwitterData(newSearchResults.data.results));
          dispatch(setSearchBackdrop(null, false));
          dispatch(setTwitterFetchData(true));
        } else {
          dispatch(isDateSet(false));
          dispatch(setSearchBackdrop(null, false));
          dispatch(setSearchError(true));
          dispatch(setTwitterData([]));
          dispatch(setTwitterMapData([]));
          dispatch(setTwitterFetchData(true));
        }
      } catch (error) {
        console.error(error);
        dispatch(isDateSet(false));
        dispatch(setSearchBackdrop(null, false));
        dispatch(setSearchError(true));
        dispatch(setTwitterData([]));
        dispatch(setTwitterMapData([]));
        dispatch(setTwitterFetchData(true));
      }
    }
  };
};
const createSearchPayloadTweets = (topicState, freshSearch) => {
  const startDate = new URLSearchParams(window.location.search).get('startDate');
  const endDate = new URLSearchParams(window.location.search).get('endDate');
  const { onlySuggestionSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText);

  const data = {
    searchTerm: getSearchText(
      topicState.simpleSearchTextArray,
      topicState.ignoreSearchTextArray,
      topicState.searchTextWithAnd,
      onlySuggestionSingleArr,
      topicState.searchText,
      topicState.isSimpleSearch
    ),

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
    page: topicState.pageNo,
    refresh_search: false,
    searchIndex: topicState.searchIndex['value'],
    document_type: ''
  };
  return data;
};

export const getMapDataByCountry = country => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `https://code.highcharts.com/mapdata/countries/${country}/${country}-all.geo.json`
      );

      const data = get(response, 'data', {});
      if (response) {
        dispatch(setTweetsCountryMapData(data));
      } else {
        dispatch(setTweetsCountryMapData({}));
      }
    } catch (error) {
      dispatch(setTweetsCountryMapData({}));
    }
  };
};

const createSearchPayloadTwitter = (topicState, freshSearch) => {
  let startDate = new URLSearchParams(window.location.search).get('startDate');
  let endDate = new URLSearchParams(window.location.search).get('endDate');

  startDate = startDate
    ? startDate && topicState.isDate
      ? topicState.isDate
        ? moment(topicState.startDate)
        : moment().subtract(12, 'months')
      : startDate
    : topicState.isDate
    ? moment(topicState.startDate)
    : moment().subtract(12, 'months');

  endDate = endDate
    ? endDate && topicState.isDate
      ? topicState.isDate
        ? moment(topicState.endDate)
        : moment(new Date())
            .subtract(1, 'minutes')
            .utc()
      : endDate
    : topicState.isDate
    ? moment(topicState.endDate)
    : moment(new Date())
        .subtract(1, 'minutes')
        .utc();

  // twiiter api allow only current-date for end-date
  endDate = endDate.isBefore(new Date())
    ? endDate
    : moment(new Date())
        .subtract(1, 'minutes')
        .utc();

  let searchTerm = topicState.simpleSearchTextArray.join(' OR ');
  searchTerm = searchTerm.trimEnd() + ' ' + topicState.searchTextWithAnd.map(item => `"${item}"`).join(' ');
  searchTerm = searchTerm.trimEnd() + ' ' + topicState.ignoreSearchTextArray.map(item => `-${item}`).join(' ');
  if (topicState.selectedCountry) {
    searchTerm = searchTerm.trimEnd() + ' place_country:' + topicState.selectedCountry.code;
  }

  if (topicState.twitterGeoLocationEnable && topicState.isSimpleSearch) {
    searchTerm = searchTerm.trimEnd() + ' has:geo';
  }
  searchTerm = searchTerm.trim().concat(' -is:retweet');

  const data = {
    searchTerm: topicState.isSimpleSearch ? searchTerm : topicState.searchText,
    startDate: startDate.format('yyyyMMDDHHmm'),
    endDate: endDate.format('yyyyMMDDHHmm'),
    maxResults: 500
  };
  return data;
};
