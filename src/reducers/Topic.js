import documentTypesData from '../config/documentTypesData';
import searchIndexs from 'config/searchIndexs';
import { getSearchIndex } from '../components/topic/topicHelpers';
import { subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { get } from 'lodash';
import { setItemInLocalStorage } from '../utils/helpers';
import { searchSuggestionTypeConfig } from '../config/appConfig';
export const SET_SELECTED_DOCUMENT_TYPES = 'TOPIC/SET_SELECTED_DOCUMENT_TYPES';
export const SET_SEARCH_TEXT = 'TOPIC/SET_SEARCH_TEXT';
export const SET_DATE_RANGE = 'TOPIC/SET_DATE_RANGE';
export const SET_SEARCH_RESULT = 'TOPIC/SET_SEARCH_RESULT';
export const SET_SEARCH_RESULT_HIGHLIGHTS = 'TOPIC/SET_SEARCH_RESULT_HIGHLIGHTS';
export const SET_SUGGESTIONS_RESULT = 'TOPIC/SET_SUGGESTIONS_RESULT';
export const SET_SUGGESTIONS_RESULT_AND_SELECTIONS = 'TOPIC/SET_SUGGESTIONS_RESULT_AND_SELECTIONS';
export const SET_SELECTED_SUGGESTIONS = 'TOPIC/SET_SELECTED_SUGGESTIONS';
export const SET_ALL_SEARCH_PARAMS = 'TOPIC/SET_ALL_SEARCH_PARAMS';
export const SET_IS_SEARCH_LOADING = 'TOPIC/SET_IS_SEARCH_LOADING';
export const SET_SEARCH_START = 'TOPIC/SET_SEARCH_START';
export const SET_SEARCH_ERROR = 'TOPIC/SET_SEARCH_ERROR';
export const SET_TOPICS_LIST = 'TOPIC/SET_TOPICS_LIST';
export const SET_IS_SAVE_DLG_OPEN = 'TOPIC/SET_IS_SAVE_DLG_OPEN';
export const SET_IS_SEARCH_SAVE_ERROR = 'TOPIC/SET_IS_SEARCH_SAVE_ERROR';
export const SET_IS_SAVE_DLG_OPEN_AND_ERROR = 'TOPIC/SET_IS_SAVE_DLG_OPEN_AND_ERROR';
export const SET_IS_SEARCH_DELETE_ERROR = 'TOPIC/SET_IS_SEARCH_DELETE_ERROR';
export const SET_IS_TOPIC_DELETE_ERROR = 'TOPIC/SET_IS_TOPIC_DELETE_ERROR';
export const SET_SELECTED_SEARCH = 'TOPIC/SET_SELECTED_SEARCH';
export const RESET_SUGGESTIONS = 'TOPIC/RESET_SUGGESTIONS';
export const SET_SUGGESTIONS_IS_LOADING = 'TOPIC/SET_SUGGESTIONS_IS_LOADING';
export const SET_SEARCH_PAGE_NO = 'TOPIC/SET_SEARCH_PAGE_NO';
export const SET_SEARCH_BACKDROP = 'TOPIC/SET_SEARCH_BACKDROP';
export const SET_SEARCH_BACKDROP_HIGHLIGHTS = 'TOPIC/SET_SEARCH_BACKDROP_HIGHLIGHTS';
export const RESET_SEARCH_RESULTS = 'TOPIC/RESET_SEARCH_RESULTS';
export const SET_IS_SEARCH_HIGHLIGHT_LOADING = 'TOPIC/SET_IS_SEARCH_HIGHLIGHT_LOADING';
export const SET_CANCEL_EXISTING_HIGHLIGHTS_CALLS = 'TOPIC/SET_CANCEL_EXISTING_HIGHLIGHTS_CALLS';
export const SET_SHOW_COMPOSE_NEW = 'TOPIC/SET_SHOW_COMPOSE_NEW';
export const SET_SHOW_UPDATE_BUTTON = 'TOPIC/SET_BUTTON_UPDATE_BUTTON';
export const RESET_ALL_SEARCH_PARAMS = 'TOPIC/RESET_ALL_SEARCH_PARAMS';
export const SET_SELECTED_COMPANY_NAME = 'TOPIC/SET_SELECTED_COMPANY_NAME';
export const SET_SELECTED_UNIVERSE = 'TOPIC/SET_SELECTED_UNIVERSE';
export const SET_SELECTED_SECTOR = 'TOPIC/SET_SELECTED_SECTOR';
export const SET_SELECTED_INDUSTRIES = 'TOPIC/SET_SELECTED_INDUSTRIES';
export const SET_SELECTED_WATCHLIST_COMPANY_NAMES = 'TOPIC/SET_SELECTED_WATCHLIST_COMPANY_NAMES';
export const SET_SAVED_SEARCHES = 'TOPIC/SET_SAVED_SEARCHES';
export const SET_SEARCH_LABEL = 'TOPIC/SET_SEARCHE_LABEL';
export const SET_SNACKBAR_ACTIVE = 'TOPIC/SET_SNACKBAR_ACTIVE';
export const SET_SELECTED_SECTION = 'TOPIC/SET_SELECTED_SECTION';
export const SET_OPEN_TOPIC_SEARCH_DIALOG = 'TOPIC/SET_OPEN_TOPIC_SEARCH_DIALOG';
export const SET_CURRENT_SEARCH_DETAIL = 'TOPIC/SET_CURRENT_SEARCH_DETAIL';
export const SET_BACKDROP_ON_COMPANY_CLICK = 'TOPIC/SET_BACKDROP_ON_COMPANY_CLICK';
export const IS_DATE_SET = 'TOPIC/IS_DATE_SET ';
export const SET_IS_FROM_SIDE_BAR = 'TOPIC/SET_IS_FROM_SIDE_BAR';
export const SET_IS_TOPIC_EMAIL_ALERT_ENABLE = 'TOPIC/SET_IS_TOPIC_EMAIL_ALERT_ENABLE';
export const SET_IS_SIMPLE_SEARCH = 'TOPIC/SET_IS_SIMPLE_SEARCH';
export const SET_SIMPLE_SEARCH_TEXT_ARRAY = 'TOPIC/SET_SIMPLE_SEARCH_TEXT_ARRAY';
export const SET_IGNORE_SEARCH_TEXT_ARRAY = 'TOPIC/SET_IGNORE_SEARCH_TEXT_ARRAY';
export const SET_SEARCH_TEXT_WITH_AND = 'TOPIC/SET_SEARCH_TEXT_WITH_AND';
export const SET_SEARCH_INDEX = 'TOPIC/SET_SEARCH_INDEX';
export const SET_TWEETS_DATA = 'TOPIC/SET_TWEETS_DATA';
export const SET_TWEETS_MAP_DATA = 'TOPIC/SET_TWEETS_MAP_DATA';
export const SET_TWEETS_COUNTRY_MAP_DATA = 'TOPIC/SET_TWEETS_COUNTRY_MAP_DATA';
export const SET_TWEETS_COUNTRY_STATES_MAP_DATA = 'TOPIC/SET_TWEETS_COUNTRY_STATES_MAP_DATA';
export const SET_TWEETS_TABLE_DATA = 'TOPIC/SET_TWEETS_TABLE_DATA';
export const SET_IS_UNSAVED_SEARCH = 'TOPIC/SET_IS_UNSAVED_SEARCH';
export const SET_IS_FROM_THEMEX = 'TOPIC/SET_IS_FROM_THEMEX';
export const SET_IS_NEWLY_SAVED_SEARCH = 'TOPIC/SET_IS_NEWLY_SAVED_SEARCH';
export const SET_SELECTED_COUNTRY = 'TOPIC/SET_SELECTED_COUNTRY';
export const SET_TOPIC_SEARCH_COMPANY = 'TOPIC/SET_TOPIC_SEARCH_COMPANY';
export const SET_TOPIC_HANDLE_SEARCH_COMBINE_REDUCER = 'TOPIC/SET_TOPIC_HANDLE_SEARCH_COMBINE_REDUCER';
export const SET_TOPIC_INDEX_DROP_DOWN_COMBINE_REDUCER = 'TOPIC/SET_TOPIC_INDEX_DROP_DOWN_COMBINE_REDUCER';
export const SET_TOPIC_HISTORY_CHART_IS_DAYS = 'TOPIC/SET_TOPIC_HISTORY_CHART_IS_DAYS';
export const SET_SEARCH_ID = 'TOPIC/SET_SEARCH_ID';
export const SET_SEARCH_SUGGESTION_TYPE = 'TOPIC/SET_SEARCH_SUGGESTION_TYPE';
export const SET_TWITTER_DATA = 'TOPIC/SET_TWITTER_DATA';
export const SET_TWITTER_MAP_DATA = 'TOPIC/SET_TWITTER_MAP_DATA';

export const setSearchId = linkSearchId => ({
  type: SET_SEARCH_ID,
  linkSearchId
});

export const setTopicIndexDropDownSearchCombineReducer = () => ({
  type: SET_TOPIC_INDEX_DROP_DOWN_COMBINE_REDUCER
});
export const setTopicHandleSearchCombineReducer = () => ({
  type: SET_TOPIC_HANDLE_SEARCH_COMBINE_REDUCER
});
export const setSearchBackdrop = (cancelTokenSource, showBackdrop) => ({
  type: SET_SEARCH_BACKDROP,
  cancelTokenSource,
  showBackdrop
});

export const setSearchBackdropHighlights = cancelTokenSourceHighlights => ({
  type: SET_SEARCH_BACKDROP_HIGHLIGHTS,
  cancelTokenSourceHighlights
});

export const setResultsPage = pageNo => ({
  type: SET_SEARCH_PAGE_NO,
  pageNo
});

export const resetResultsPage = () => ({
  type: RESET_SEARCH_RESULTS
});

export const setSuggestionsIsLoading = suggestionsIsLoading => ({
  type: SET_SUGGESTIONS_IS_LOADING,
  suggestionsIsLoading
});

export const setSelectedSearch = (selectedSearch, selectedTopic) => ({
  type: SET_SELECTED_SEARCH,
  selectedSearch,
  selectedTopic
});

export const setIsSearchDeleteErr = isSearchDeleteError => ({
  type: SET_IS_SEARCH_DELETE_ERROR,
  isSearchDeleteError
});

export const setIsTopicDeleteErr = isTopicDeleteError => ({
  type: SET_IS_TOPIC_DELETE_ERROR,
  isTopicDeleteError
});

export const setSelectedDocumentTypes = selectedDocumentTypes => ({
  type: SET_SELECTED_DOCUMENT_TYPES,
  selectedDocumentTypes
});

export const setTopicSearchText = text => ({
  type: SET_SEARCH_TEXT,
  text
});

export const setTopicSearchDateRange = dateRangeObj => ({
  type: SET_DATE_RANGE,
  dateRangeObj
});

export const setSearchResults = searchResult => ({
  type: SET_SEARCH_RESULT,
  searchResult
});

export const setSuggestions = suggestions => ({
  type: SET_SUGGESTIONS_RESULT,
  suggestions
});

export const setSuggestionsWithSelections = (suggestions, selectedSuggestions) => ({
  type: SET_SUGGESTIONS_RESULT_AND_SELECTIONS,
  data: { suggestions, selectedSuggestions }
});

export const setSelectedSuggestions = selectedSuggestions => ({
  type: SET_SELECTED_SUGGESTIONS,
  selectedSuggestions
});

export const setAllSearchParams = searchObj => ({
  type: SET_ALL_SEARCH_PARAMS,
  searchObj
});

export const setIsSearchLoading = isSearchLoading => ({
  type: SET_IS_SEARCH_LOADING,
  isSearchLoading
});

export const setSearchStart = () => ({
  type: SET_SEARCH_START
});

export const setSearchError = isSearchError => ({
  type: SET_SEARCH_ERROR,
  isSearchError
});

export const setTopicsList = topicsList => ({
  type: SET_TOPICS_LIST,
  topicsList
});

export const setIsSaveDlgOpen = isSaveDlgOpen => ({
  type: SET_IS_SAVE_DLG_OPEN,
  isSaveDlgOpen
});

export const setIsSaveSearchError = isSearchSaveError => ({
  type: SET_IS_SEARCH_SAVE_ERROR,
  isSearchSaveError
});

export const setIsSaveDlgOpenAndError = (isSaveDlgOpen, isSearchSaveError) => ({
  type: SET_IS_SAVE_DLG_OPEN_AND_ERROR,
  isSaveDlgOpen,
  isSearchSaveError
});

export const resetSuggestions = () => ({
  type: RESET_SUGGESTIONS
});

export const setSearchResultHighlights = searchResult => ({
  type: SET_SEARCH_RESULT_HIGHLIGHTS,
  searchResult
});

export const setIsSearchHighlightLoading = isHighlightsSearchLoading => ({
  type: SET_IS_SEARCH_HIGHLIGHT_LOADING,
  isHighlightsSearchLoading
});

export const cancelExistingHightlightsCalls = flag => ({
  type: SET_CANCEL_EXISTING_HIGHLIGHTS_CALLS,
  flag
});

export const setShowComposeNew = showFilters => ({
  type: SET_SHOW_COMPOSE_NEW,
  showFilters
});

export const setShowUpdateButton = showUpdateButton => ({
  type: SET_SHOW_UPDATE_BUTTON,
  showUpdateButton
});

export const resetAllSearchParams = () => ({
  type: RESET_ALL_SEARCH_PARAMS
});

export const setSelectedCompanyName = selectedCompanyName => ({
  type: SET_SELECTED_COMPANY_NAME,
  selectedCompanyName
});

export const setSelectedUniverse = selectedUniverse => ({
  type: SET_SELECTED_UNIVERSE,
  selectedUniverse
});

export const setSelectedSector = selectedSector => ({
  type: SET_SELECTED_SECTOR,
  selectedSector
});

export const setSelectedIndustries = selectedIndustries => ({
  type: SET_SELECTED_INDUSTRIES,
  selectedIndustries
});

export const setSelectedWatchlistCompanyNames = selectedWatchlistCompanyNames => ({
  type: SET_SELECTED_WATCHLIST_COMPANY_NAMES,
  selectedWatchlistCompanyNames
});

export const setSavedSearches = savedSearches => ({
  type: SET_SAVED_SEARCHES,
  savedSearches
});

export const setSearchLabel = searchLabel => ({
  type: SET_SEARCH_LABEL,
  searchLabel
});

export const setSnackBarActive = (isSnackBarActive, snackBarSeverity, snackBarMessage) => ({
  type: SET_SNACKBAR_ACTIVE,
  isSnackBarActive,
  snackBarSeverity,
  snackBarMessage
});

export const setSelectedSection = selectedSection => ({
  type: SET_SELECTED_SECTION,
  selectedSection
});

export const setOpenTopicSearchDialog = openTopicSearchDialog => ({
  type: SET_OPEN_TOPIC_SEARCH_DIALOG,
  openTopicSearchDialog
});

export const setCurrentSearchtDetail = currentSearchDetail => ({
  type: SET_CURRENT_SEARCH_DETAIL,
  currentSearchDetail
});

export const setBackDropOnCompanyClick = isCompanyClick => ({
  type: SET_BACKDROP_ON_COMPANY_CLICK,
  isCompanyClick
});

export const isDateSet = isDate => ({
  type: IS_DATE_SET,
  isDate
});

export const setIsFromSideBar = isFromSideBar => ({
  type: SET_IS_FROM_SIDE_BAR,
  isFromSideBar
});

export const setIsTopicEmailAlertEnable = isTopicEmailAlertEnable => ({
  type: SET_IS_TOPIC_EMAIL_ALERT_ENABLE,
  isTopicEmailAlertEnable
});
export const setIsSimpleSearch = isSimpleSearch => ({
  type: SET_IS_SIMPLE_SEARCH,
  isSimpleSearch
});

export const setSimpleSearchTextArray = simpleSearchTextArray => ({
  type: SET_SIMPLE_SEARCH_TEXT_ARRAY,
  simpleSearchTextArray
});

export const setIgnoreSearchTextArray = ignoreSearchTextArray => ({
  type: SET_IGNORE_SEARCH_TEXT_ARRAY,
  ignoreSearchTextArray
});

export const setSearchTextWithAnd = searchTextWithAnd => ({
  type: SET_SEARCH_TEXT_WITH_AND,
  searchTextWithAnd
});

export const setSearchIndex = searchIndex => ({
  type: SET_SEARCH_INDEX,
  searchIndex
});
export const setTweetsData = tweetsData => ({
  type: SET_TWEETS_DATA,
  tweetsData
});
export const setTweetsMapData = tweetsMapData => ({
  type: SET_TWEETS_MAP_DATA,
  tweetsMapData
});

export const setTweetsCountryMapData = tweetsCountryMapData => ({
  type: SET_TWEETS_COUNTRY_MAP_DATA,
  tweetsCountryMapData
});

export const setTweetsCountryStatesMapData = tweetsCountryStatesMapData => ({
  type: SET_TWEETS_COUNTRY_STATES_MAP_DATA,
  tweetsCountryStatesMapData
});

export const setTweetsTableData = tweetsTableData => ({
  type: SET_TWEETS_TABLE_DATA,
  tweetsTableData
});
export const setIsUnsavedSearch = isUnsavedSearch => ({
  type: SET_IS_UNSAVED_SEARCH,
  isUnsavedSearch
});

export const setIsFromThemex = isFromThemex => ({
  type: SET_IS_FROM_THEMEX,
  isFromThemex
});

export const setIsnNewlySavedSearch = isNewlySavedSearch => ({
  type: SET_IS_NEWLY_SAVED_SEARCH,
  isNewlySavedSearch
});

export const setSelectedCountry = selectedCountry => ({
  type: SET_SELECTED_COUNTRY,
  selectedCountry
});

export const setTopicSearchCompany = topicSearchedComapny => ({
  type: SET_TOPIC_SEARCH_COMPANY,
  topicSearchedComapny
});

export const setIsDays = isDays => ({
  type: SET_TOPIC_HISTORY_CHART_IS_DAYS,
  isDays
});

export const setSearchSuggestionType = searchSuggestionType => ({
  type: SET_SEARCH_SUGGESTION_TYPE,
  searchSuggestionType
});

export const setTwitterData = twitterData => ({
  type: SET_TWITTER_DATA,
  twitterData
});

export const setTwitterMapData = twitterMapData => ({
  type: SET_TWITTER_MAP_DATA,
  twitterMapData
});
const searchDefaultState = () => ({
  searchText: '',
  tweetsCountryMapData: {},
  tweetsData: [],
  tweetsMapData: [],
  searchIndex: searchIndexs[0],
  startDate: subMonths(startOfMonth(new Date()), 12),
  endDate: endOfMonth(new Date()),
  orderBy: 'desc',
  sortBy: 'document_date',
  selectedSuggestions: {},
  tweetsCountryStatesMapData: [],
  tweetsTableData: [],
  selectedDocumentTypes: [
    '10-K',
    '10-Q',
    '20-F',
    '40-F',
    '6-K',
    '8-K',
    'AR',
    'EC-FMP',
    'ESG',
    'FIN-SUPP',
    'OTH-FIN',
    'QR',
    'SR'
  ],
  twitterData: [],
  twitterMapData: [],
  // 'FMP-transcript',
  // '10-K',
  // '10-Q',
  // '8-K',
  // '40-F',
  // '20-F',
  // '6-K',
  // '10-K/A',
  // '10-K405',
  // '10-K405/A',
  // '10-KT',documentTypes
  // '10-KT/A',
  // '10-Q/A',
  // '10-QT',
  // '10-QT/A',
  // '10QSB',
  // '20-F/A',
  // '40-F/A',
  // '6-K/A',
  // '8-K/A',
  // '8-K12B',
  // '8-K12B/A',
  // '8-K12G3',
  // '8-K12G3/A',
  // '8-K15D5',
  // 'AR',
  // 'ARS',
  // 'ARS/A',
  // 'CORR',
  // 'DEF 14A',
  // 'EP',
  // 'ER',
  // 'FIN SUPP',
  // 'Intierra SR',
  // 'Intl Offer',
  // 'MEG - AR',
  // 'NT 10-Q',
  // 'OC',
  // 'Other Financials',
  // 'pdf',
  // 'PR',
  // 'QR',
  // 'QR/A',
  // 'SR',
  // 'Tanshin',
  // 'Annual Report of State Filings',
  // 'Basel 2 P3',
  // 'Basel Report',
  // 'Call RPT 041',
  // 'Corporate Governance Report',
  // 'Corporate Social Responsibility Report',
  // 'CP',
  // 'Credit Research',
  // 'DEFS 14A',
  // 'DNP AR',
  // 'DNP FIN SUPP',
  // 'DNP Intl Off',
  // 'DNP PR',
  // 'DNP QR',
  // 'DNP SR',
  // 'Environmental Report',
  // 'EVR',
  // 'IncStatement',
  // 'Industry Document',
  // 'IP',
  // 'LCD News',
  // 'Misc.',
  // 'MP',
  // 'MR',
  // 'Other',
  // 'Other RNS',
  // 'PROP SUPP',
  // 'SFCR',
  // 'Sustainability Report',
  // 'US Patriot',
  // 'Y-9C',
  // 'Yuho',
  // 'TCFD Report'

  selectedUniverse: 'all',
  selectedSection: 'totdoc',
  selectedSector: null,
  selectedIndustries: [],
  selectedWatchlistCompanyNames: [],
  isTopicEmailAlertEnable: true,
  searchLabel: '',
  isSimpleSearch: true,
  simpleSearchTextArray: [],
  ignoreSearchTextArray: [],
  searchTextWithAnd: [],
  isUnsavedSearch: false,
  selectedCountry: null
});

const getDefaultState = () => {
  return {
    ...searchDefaultState(),
    pageNo: 0,
    documentTypes: documentTypesData,
    suggestions: {},
    searchResult: {},
    isSearchLoading: false,
    isSearchError: false,
    topicsList: [],
    isSaveDlgOpen: false,
    isSearchSaveError: false,
    isSearchDeleteError: false,
    isTopicDeleteError: false,
    selectedSearch: null,
    selectedTopic: null,
    suggestionsIsLoading: false,
    cancelTokenSource: null,
    cancelTokenSourceHighlights: null,
    showBackdrop: false,
    searchResultHighlights: [],
    isHighlightsSearchLoading: false,
    cancelExistingHighlightCalls: false,
    showFilters: false,
    showUpdateButton: false,
    selectedCompanyName: null,
    savedSearches: [],
    isSnackBarActive: false,
    snackBarMessage: null,
    snackBarSeverity: null,
    openTopicSearchDialog: false,
    currentSearchDetail: {},
    isCompanyClick: false,
    isDate: false,
    isFromSideBar: false,
    isFromThemex: false,
    isNewlySavedSearch: false,
    topicSearchedComapny: '',
    isDays: false,
    linkSearchId: null,
    searchSuggestionType: searchSuggestionTypeConfig.simpleSearchTextArray
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_SELECTED_DOCUMENT_TYPES:
      return { ...state, selectedDocumentTypes: action.selectedDocumentTypes };
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.text };
    case SET_DATE_RANGE:
      return { ...state, startDate: action.dateRangeObj.startDate, endDate: action.dateRangeObj.endDate };
    case SET_SEARCH_RESULT:
      return { ...state, searchResult: action.searchResult, isSearchLoading: false, isSearchError: false };
    case SET_SUGGESTIONS_RESULT:
      return { ...state, suggestions: action.suggestions };
    case SET_SUGGESTIONS_RESULT_AND_SELECTIONS:
      return { ...state, suggestions: action.data.suggestions, selectedSuggestions: action.data.selectedSuggestions };
    case SET_SELECTED_SUGGESTIONS:
      return { ...state, selectedSuggestions: action.selectedSuggestions };
    case SET_ALL_SEARCH_PARAMS:
      return {
        ...state,
        isTopicEmailAlertEnable: action.searchObj.send_topic_alert_email,
        searchText: action.searchObj.searchText,
        searchLabel: action.searchObj.searchLabel,
        selectedDocumentTypes: action.searchObj.searchJSON.selectedDocumentTypes,
        // startDate: new Date(action.searchObj.searchJSON.startDate),
        // endDate: new Date(action.searchObj.searchJSON.endDate),
        orderBy: action.searchObj.searchJSON.orderBy,
        sortBy: action.searchObj.searchJSON.sortBy,
        selectedSuggestions: action.searchObj.searchJSON.selectedSuggestions,
        searchIndex: getSearchIndex(get(action.searchObj, 'searchJSON.searchIndex', searchDefaultState().searchIndex)),
        selectedUniverse: get(action.searchObj, 'searchJSON.universe', searchDefaultState().selectedUniverse),
        selectedSector: get(action.searchObj, 'searchJSON.sector', searchDefaultState().selectedSector),
        selectedIndustries: get(action.searchObj, 'searchJSON.industry_arr', searchDefaultState().selectedIndustries),
        isSimpleSearch: get(action.searchObj, 'searchJSON.isSimpleSearch', false),
        selectedCountry: get(action.searchObj, 'searchJSON.countryCode', null),
        simpleSearchTextArray: get(
          action.searchObj,
          'searchJSON.simpleSearchTextArray',
          searchDefaultState().simpleSearchTextArray
        ),
        ignoreSearchTextArray: get(
          action.searchObj,
          'searchJSON.ignoreSearchTextArray',
          searchDefaultState().ignoreSearchTextArray
        ),
        selectedWatchlistCompanyNames: get(
          action.searchObj,
          'searchJSON.company_arr',
          searchDefaultState().selectedWatchlistCompanyNames
        ),
        searchTextWithAnd: get(
          action.searchObj,
          'searchJSON.searchTextWithAnd',
          searchDefaultState().searchTextWithAnd
        ),
        searchIndexLocal: setItemInLocalStorage(
          'searchIndex',
          getSearchIndex(get(action.searchObj, 'searchJSON.searchIndex', searchDefaultState().searchIndex)),
          true
        )
      };
    case RESET_ALL_SEARCH_PARAMS:
      return {
        ...state,
        ...searchDefaultState()
      };
    case SET_IS_SEARCH_LOADING:
      return { ...state, isSearchLoading: action.isSearchLoading };
    case SET_SEARCH_START:
      return { ...state, isSearchLoading: true, isHighlightsSearchLoading: true, isSearchError: false };
    case SET_SEARCH_ERROR:
      return { ...state, isSearchLoading: false, isSearchError: action.isSearchError };
    case SET_TOPICS_LIST:
      return { ...state, topicsList: action.topicsList };
    case SET_IS_SAVE_DLG_OPEN:
      return { ...state, isSaveDlgOpen: action.isSaveDlgOpen };
    case SET_IS_SEARCH_SAVE_ERROR:
      return { ...state, isSearchSaveError: action.isSearchSaveError };
    case SET_IS_SAVE_DLG_OPEN_AND_ERROR:
      return { ...state, isSearchSaveError: action.isSearchSaveError, isSaveDlgOpen: action.isSaveDlgOpen };
    case SET_IS_SEARCH_DELETE_ERROR:
      return { ...state, isSearchDeleteError: action.isSearchDeleteError };
    case SET_IS_TOPIC_DELETE_ERROR:
      return { ...state, isTopicDeleteError: action.isTopicDeleteError };
    case SET_SELECTED_SEARCH:
      return { ...state, selectedSearch: action.selectedSearch, selectedTopic: action.selectedTopic };
    case RESET_SUGGESTIONS:
      return { ...state, selectedSuggestions: {}, suggestions: {} };
    case SET_SUGGESTIONS_IS_LOADING:
      return { ...state, suggestionsIsLoading: action.suggestionsIsLoading };
    case SET_SEARCH_PAGE_NO:
      return { ...state, pageNo: action.pageNo };
    case SET_SEARCH_BACKDROP:
      return { ...state, cancelTokenSource: action.cancelTokenSource, showBackdrop: action.showBackdrop };
    case SET_SEARCH_RESULT_HIGHLIGHTS:
      return { ...state, searchResultHighlights: action.searchResult, isSearchError: false };
    case SET_IS_SEARCH_HIGHLIGHT_LOADING:
      return { ...state, isHighlightsSearchLoading: action.isHighlightsSearchLoading };
    case SET_SEARCH_BACKDROP_HIGHLIGHTS:
      return { ...state, cancelTokenSourceHighlights: action.cancelTokenSourceHighlights };
    case RESET_SEARCH_RESULTS:
      return { ...state, searchResultHighlights: [], pageNo: 0 };
    case SET_CANCEL_EXISTING_HIGHLIGHTS_CALLS:
      return { ...state, cancelExistingHighlightCalls: action.flag };
    case SET_SHOW_COMPOSE_NEW:
      return { ...state, showFilters: action.showFilters };
    case SET_SHOW_UPDATE_BUTTON:
      return { ...state, showUpdateButton: action.showUpdateButton };
    case SET_SELECTED_COMPANY_NAME:
      return { ...state, selectedCompanyName: action.selectedCompanyName };
    case SET_SELECTED_UNIVERSE:
      return { ...state, selectedUniverse: action.selectedUniverse };
    case SET_SELECTED_SECTOR:
      return { ...state, selectedSector: action.selectedSector };
    case SET_SELECTED_INDUSTRIES:
      return { ...state, selectedIndustries: action.selectedIndustries };
    case SET_SELECTED_WATCHLIST_COMPANY_NAMES:
      return { ...state, selectedWatchlistCompanyNames: action.selectedWatchlistCompanyNames };
    case SET_SAVED_SEARCHES:
      return { ...state, savedSearches: action.savedSearches };
    case SET_SEARCH_LABEL:
      return { ...state, searchLabel: action.searchLabel };
    case SET_SNACKBAR_ACTIVE:
      return {
        ...state,
        isSnackBarActive: action.isSnackBarActive,
        snackBarSeverity: action.snackBarSeverity,
        snackBarMessage: action.snackBarMessage
      };
    case SET_SELECTED_SECTION:
      return {
        ...state,
        selectedSection: action.selectedSection
      };
    case SET_OPEN_TOPIC_SEARCH_DIALOG:
      return { ...state, openTopicSearchDialog: action.openTopicSearchDialog };
    case SET_CURRENT_SEARCH_DETAIL:
      return { ...state, currentSearchDetail: action.currentSearchDetail };
    case SET_BACKDROP_ON_COMPANY_CLICK:
      return { ...state, isCompanyClick: action.isCompanyClick };
    case IS_DATE_SET:
      return { ...state, isDate: action.isDate };
    case SET_IS_FROM_SIDE_BAR:
      return { ...state, isFromSideBar: action.isFromSideBar };
    case SET_IS_TOPIC_EMAIL_ALERT_ENABLE:
      return { ...state, isTopicEmailAlertEnable: action.isTopicEmailAlertEnable };
    case SET_IS_SIMPLE_SEARCH:
      return { ...state, isSimpleSearch: action.isSimpleSearch };
    case SET_SIMPLE_SEARCH_TEXT_ARRAY:
      return { ...state, simpleSearchTextArray: action.simpleSearchTextArray };
    case SET_IGNORE_SEARCH_TEXT_ARRAY:
      return { ...state, ignoreSearchTextArray: action.ignoreSearchTextArray };
    case SET_SEARCH_TEXT_WITH_AND:
      return { ...state, searchTextWithAnd: action.searchTextWithAnd };
    case SET_SEARCH_INDEX:
      return { ...state, searchIndex: action.searchIndex };
    case SET_TWEETS_DATA:
      return { ...state, tweetsData: action.tweetsData };
    case SET_TWEETS_MAP_DATA:
      return { ...state, tweetsMapData: action.tweetsMapData };
    case SET_TWEETS_COUNTRY_MAP_DATA:
      return { ...state, tweetsCountryMapData: action.tweetsCountryMapData };
    case SET_TWEETS_COUNTRY_STATES_MAP_DATA:
      return { ...state, tweetsCountryStatesMapData: action.tweetsCountryStatesMapData };
    case SET_TWEETS_TABLE_DATA:
      return { ...state, tweetsTableData: action.tweetsTableData };
    case SET_IS_UNSAVED_SEARCH:
      return { ...state, isUnsavedSearch: action.isUnsavedSearch };
    case SET_IS_FROM_THEMEX:
      return { ...state, isFromThemex: action.isFromThemex };
    case SET_IS_NEWLY_SAVED_SEARCH:
      return { ...state, isNewlySavedSearch: action.isNewlySavedSearch };
    case SET_SELECTED_COUNTRY:
      return { ...state, selectedCountry: action.selectedCountry };
    case SET_TOPIC_SEARCH_COMPANY:
      return { ...state, topicSearchedComapny: action.topicSearchedComapny };
    case SET_TOPIC_HISTORY_CHART_IS_DAYS:
      return { ...state, isDays: action.isDays };
    case SET_TOPIC_HANDLE_SEARCH_COMBINE_REDUCER:
      return {
        ...state,
        searchResult: [],
        searchResultHighlights: [],
        pageNo: 0
      };
    case SET_TOPIC_INDEX_DROP_DOWN_COMBINE_REDUCER:
      return {
        ...state,
        selectedSector: null,
        selectedIndustries: []
      };

    case SET_SEARCH_ID:
      return { ...state, linkSearchId: action.linkSearchId };
    case SET_SEARCH_SUGGESTION_TYPE:
      return { ...state, searchSuggestionType: action.searchSuggestionType };
    case SET_TWITTER_DATA:
      return { ...state, twitterData: action.twitterData };
    case SET_TWITTER_MAP_DATA:
      return { ...state, twitterMapData: action.twitterMapData };

    default:
      break;
  }
  return state;
}
