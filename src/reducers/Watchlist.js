export const SET_FILE_TYPE = 'WATCHLIST/SET_FILE_TYPE';
export const SET_UNIVERSE = 'WATCHLIST/SET_UNIVERSE';
export const SET_METRIC = 'WATCHLIST/SET_METRIC';
export const SET_SEARCH_TEXT = 'WATCHLIST/SET_SEARCH_TEXT';
export const SET_SELECTED_TAB = 'WATCHLIST/SET_SELECTED_TAB';
export const SET_SELECTED_WATCHLIST = 'WATCHLIST/SET_SELECTED_WATCHLIST';
export const SET_SELECTED_SYMBOLS = 'WATCHLIST/SET_SELECTED_SYMBOLS';
export const RESET_WATCHLIST = 'WATCHLIST/RESET_WATCHLIST';
export const SET_RECENT_DATALOADED_FLAG = 'WATCHLIST/SET_RECENT_DATALOADED_FLAG';
export const SET_COMPELTE_DATALOADED_FLAG = 'WATCHLIST/SET_COMPELTE_DATALOADED_FLAG';
export const SET_COUNT = 'WATCHLIST/SET_COUNT';
export const SET_OVERWRITE_CHECK_BOX = 'WATCHLIST/SET_OVERWRITE_CHECK_BOX';
export const SET_SELECTED_TICKER_SYMBOL = 'WATCHLIST/SET_SELECTED_TICKER_SYMBOL';
export const SET_IS_NEW_WATCHLIST_DATA_AVAILABLE = 'WATCHLIST/SET_IS_NEW_WATCHLIST_DATA_AVAILABLE ';
export const SET_IS_ONE_HOUR_COMPLETE = 'WATCHLIST/SET_IS_ONE_HOUR_COMPLETE';
export const SET_IS_COLOR_ENABLE = 'WATCHLIST/SET_IS_COLOR_ENABLE';
export const SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE = 'WATCHLIST/SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE';
export const CANCELE_EXISTING_DOCUMENT_TYPE_CALLS = 'WATCHLIST/CANCELE_EXISTING_DOCUMENT_TYPE_CALLS';

export const setOverwriteCheckBox = overwriteCheckBox => ({
  type: SET_OVERWRITE_CHECK_BOX,
  overwriteCheckBox
});

export const setCount = count => ({
  type: SET_COUNT,
  count
});

export const setWatchlistFileType = fileType => ({
  type: SET_FILE_TYPE,
  fileType
});
export const setWatchlistUniverse = universe => ({
  type: SET_UNIVERSE,
  universe
});
export const setWatchlistMetric = metric => ({
  type: SET_METRIC,
  metric
});
export const setWatchlistSearchText = searchText => ({
  type: SET_SEARCH_TEXT,
  searchText
});
export const setWatchlistTopicTab = selectedTab => ({
  type: SET_SELECTED_TAB,
  selectedTab
});
export const setSelectedWatchlist = selectedItem => ({
  type: SET_SELECTED_WATCHLIST,
  selectedItem
});
export const setWatchlistSelectedSymbols = selectedSymbols => ({
  type: SET_SELECTED_SYMBOLS,
  selectedSymbols
});
export const setRecentDataLoadedFlag = recentDataLoaded => ({
  type: SET_RECENT_DATALOADED_FLAG,
  recentDataLoaded
});
export const setCompleteDataLoadedFlag = completeDataLoaded => ({
  type: SET_COMPELTE_DATALOADED_FLAG,
  completeDataLoaded
});
export const resetWatchlist = () => ({
  type: RESET_WATCHLIST
});
export const setSelectedTickerSymbol = selectedTickerSymbol => ({
  type: SET_SELECTED_TICKER_SYMBOL,
  selectedTickerSymbol
});
export const setIsNewWatchlistDataAvailable = isNewWatchListDataAvailable => ({
  type: SET_IS_NEW_WATCHLIST_DATA_AVAILABLE,
  isNewWatchListDataAvailable
});

export const setIsOneHourComplete = isOneHourComplete => ({
  type: SET_IS_ONE_HOUR_COMPLETE,
  isOneHourComplete
});

export const setIsColorEnable = isColorEnable => ({
  type: SET_IS_COLOR_ENABLE,
  isColorEnable
});

export const setIsWatchlistEmailAlertEnable = isEmailAlertEnable => ({
  type: SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE,
  isEmailAlertEnable
});

export const setCancelExistingDocumentTypeCalls = cancelExistingDocumentTypeCalls => ({
  type: CANCELE_EXISTING_DOCUMENT_TYPE_CALLS,
  cancelExistingDocumentTypeCalls
});

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};
const getDefaultState = () => {
  const user = getUser();
  return {
    selectedFileType: '10q',
    selectedUniverse: 'watchlist',
    selectedMetric: 'totdoc',
    searchText: '',
    selectedTab: 0,
    count: 0,
    selectedSymbols: [],
    selectedItem: null,
    recentDataLoaded: false,
    completeDataLoaded: false,
    overwriteCheckBox: false,
    selectedTickerSymbol: null,
    isNewWatchListDataAvailable: true,
    isOneHourComplete: false,
    isColorEnable: user ? (user.enable_watchlist_color ? user.enable_watchlist_color : false) : false,
    isEmailAlertEnable: user ? (user.send_watchlist_alert_email ? user.send_watchlist_alert_email : false) : false,
    cancelExistingDocumentTypeCalls: null
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    // watchlist
    case SET_OVERWRITE_CHECK_BOX:
      return { ...state, overwriteCheckBox: action.overwriteCheckBox };
    case SET_COUNT:
      return { ...state, count: action.count };
    case SET_FILE_TYPE:
      return { ...state, selectedFileType: action.fileType };
    case SET_UNIVERSE:
      return { ...state, selectedUniverse: action.universe };
    case SET_METRIC:
      return { ...state, selectedMetric: action.metric };
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    case SET_SELECTED_TAB:
      return { ...state, selectedTab: action.selectedTab };
    case SET_SELECTED_WATCHLIST:
      return { ...state, selectedItem: action.selectedItem };
    case SET_SELECTED_SYMBOLS:
      return { ...state, selectedSymbols: action.selectedSymbols };
    case SET_RECENT_DATALOADED_FLAG:
      return { ...state, recentDataLoaded: action.recentDataLoaded };
    case SET_COMPELTE_DATALOADED_FLAG:
      return { ...state, completeDataLoaded: action.completeDataLoaded };
    case RESET_WATCHLIST:
      return { ...state, ...getDefaultState() };
    case SET_SELECTED_TICKER_SYMBOL:
      return { ...state, selectedTickerSymbol: action.selectedTickerSymbol };
    case SET_IS_NEW_WATCHLIST_DATA_AVAILABLE:
      return { ...state, isNewWatchListDataAvailable: action.isNewWatchListDataAvailable };
    case SET_IS_ONE_HOUR_COMPLETE:
      return { ...state, isOneHourComplete: action.isOneHourComplete };
    case SET_IS_COLOR_ENABLE:
      return { ...state, isColorEnable: action.isColorEnable };
    case SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE:
      return { ...state, isEmailAlertEnable: action.isEmailAlertEnable };
    case CANCELE_EXISTING_DOCUMENT_TYPE_CALLS:
      return { ...state, cancelExistingDocumentTypeCalls: action.cancelExistingDocumentTypeCalls };
    default:
      break;
  }
  return state;
}
