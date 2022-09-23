import { isEmpty, get } from 'lodash';
export const SET_FILE_TYPE = 'WATCHLIST/SET_FILE_TYPE';
export const SET_TYPE = 'WATCHLIST/SET_TYPE';
export const SET_UNIVERSE = 'WATCHLIST/SET_UNIVERSE';
export const SET_METRIC = 'WATCHLIST/SET_METRIC';
export const SET_SELECTED_TAB = 'WATCHLIST/SET_SELECTED_TAB';
export const SET_SELECTED_WATCHLIST = 'WATCHLIST/SET_SELECTED_WATCHLIST';
export const SET_SELECTED_SYMBOLS = 'WATCHLIST/SET_SELECTED_SYMBOLS';
export const RESET_WATCHLIST = 'WATCHLIST/RESET_WATCHLIST';
export const SET_RECENT_DATALOADED_FLAG = 'WATCHLIST/SET_RECENT_DATALOADED_FLAG';
export const SET_COMPELTE_DATALOADED_FLAG = 'WATCHLIST/SET_COMPELTE_DATALOADED_FLAG';
export const SET_COMPELTE_DATALOADED_GLOBAL_FLAG = 'WATCHLIST/SET_COMPELTE_DATALOADED_GLOBAL_FLAG';
export const SET_COUNT = 'WATCHLIST/SET_COUNT';
export const SET_OVERWRITE_CHECK_BOX = 'WATCHLIST/SET_OVERWRITE_CHECK_BOX';
export const SET_SELECTED_TICKER_SYMBOL = 'WATCHLIST/SET_SELECTED_TICKER_SYMBOL';
export const SET_IS_NEW_WATCHLIST_DATA_AVAILABLE = 'WATCHLIST/SET_IS_NEW_WATCHLIST_DATA_AVAILABLE ';
export const SET_IS_ONE_HOUR_COMPLETE = 'WATCHLIST/SET_IS_ONE_HOUR_COMPLETE';
export const SET_IS_COLOR_ENABLE = 'WATCHLIST/SET_IS_COLOR_ENABLE';
export const SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE = 'WATCHLIST/SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE';
export const CANCELE_EXISTING_DOCUMENT_TYPE_CALLS = 'WATCHLIST/CANCELE_EXISTING_DOCUMENT_TYPE_CALLS';
export const SET_IS_FILTER_ACTIVE = 'WATCHLIST/SET_IS_FILTER_ACTIVE';
export const SET_IS_TICKER_SELECTED = 'WATCHLIST/SET_IS_TICKER_SELECTED';
export const SET_COMPLETE_COMPANIES_DATA = 'WATCHLIST/SET_COMPLETE_COMPANIES_DATA';
export const SET_COMPLETE_COMPANIES_GLOBAL_DATA = 'WATCHLIST/SET_COMPLETE_COMPANIES_GLOBAL_DATA';
export const SET_NOTIFICATION_DATA = 'WATCHLIST/SET_NOTIFICATION_DATA';
export const SET_EMAIL_TEMPLATE = 'WATCHLIST/SET_EMAIL_TEMPLATE';
export const SET_FILTER_LABEL = 'WATCHLIST/SET_FILTER_LABEL';
export const SET_SELECTED_FILTER = 'WATCHLIST/SET_SELECTED_FILTER';
export const SET_IS_FILTER_UPDATE = 'WATCHLIST/SET_IS_FILTER_UPDATE';
export const SET_IS_ACTIVE_COMPANIES = 'WATCHLIST/SET_IS_ACTIVE_COMPANIES';
export const SET_USER_WATCHLIST = 'WATCHLIST/SET_USER_WATCHLIST';
export const SET_COMPLETE_COMPANIES_DATA_INDEXS = 'WATCHLIST/SET_COMPLETE_COMPANIES_DATA_INDEXS';
export const SET_COMPLETE_COMPANIES_DATA_GLOBAL_INDEXS = 'WATCHLIST/SET_COMPLETE_COMPANIES_DATA_GLOBAL_INDEXS';

export const setUserWatchlist = userWatchlist => ({
  type: SET_USER_WATCHLIST,
  userWatchlist
});

export const setIsActiveCompanies = isActiveCompanies => ({
  type: SET_IS_ACTIVE_COMPANIES,
  isActiveCompanies
});

export const setIsFilterUpdate = isFilterUpdate => ({
  type: SET_IS_FILTER_UPDATE,
  isFilterUpdate
});
export const setSelectedFilter = selectedFilter => ({
  type: SET_SELECTED_FILTER,
  selectedFilter
});
export const setFilterLabel = filterLabel => ({
  type: SET_FILTER_LABEL,
  filterLabel
});
export const setEmailTemplate = emailTemplate => ({
  type: SET_EMAIL_TEMPLATE,
  emailTemplate
});
export const setOverwriteCheckBox = overwriteCheckBox => ({
  type: SET_OVERWRITE_CHECK_BOX,
  overwriteCheckBox
});

export const setCount = count => ({
  type: SET_COUNT,
  count
});

export const setWatchlistType = watchlistType => ({
  type: SET_TYPE,
  watchlistType
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

export const setIsFilterActive = isFilterActive => ({
  type: SET_IS_FILTER_ACTIVE,
  isFilterActive
});

export const setIsTickerSelected = isTickerSelected => ({
  type: SET_IS_TICKER_SELECTED,
  isTickerSelected
});

export const setCompleteDataLoadedFlag = isCompleteCompaniesDataLoaded => ({
  type: SET_COMPELTE_DATALOADED_FLAG,
  isCompleteCompaniesDataLoaded
});

export const setCompleteCompaniesData = completeCompaniesData => ({
  type: SET_COMPLETE_COMPANIES_DATA,
  completeCompaniesData
});

export const setCompleteDataLoadedGlobalFlag = isCompleteCompaniesDataGlobalLoaded => ({
  type: SET_COMPELTE_DATALOADED_GLOBAL_FLAG,
  isCompleteCompaniesDataGlobalLoaded
});

export const setCompleteGlobalCompaniesData = completeCompaniesDataGlobal => ({
  type: SET_COMPLETE_COMPANIES_GLOBAL_DATA,
  completeCompaniesDataGlobal
});

export const setNotificationData = notifications => ({
  type: SET_NOTIFICATION_DATA,
  notifications
});

export const setCompleteCompaniesDataIndexs = completeCompaniesDataIndexs => ({
  type: SET_COMPLETE_COMPANIES_DATA_INDEXS,
  completeCompaniesDataIndexs
});
export const setCompleteCompaniesDataGlobalIndex = completeCompaniesDataGlobalIndexs => ({
  type: SET_COMPLETE_COMPANIES_DATA_GLOBAL_INDEXS,
  completeCompaniesDataGlobalIndexs
});

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};
const getWatchlistSettings = () => {
  const watchlistSettings = JSON.parse(localStorage.getItem('watchlistSetting'));
  return watchlistSettings;
};
const getDefaultState = () => {
  const user = getUser();
  const watchlistSetting = getWatchlistSettings();
  const selectedTypeWatchList = !isEmpty(watchlistSetting)
    ? watchlistSetting.selectedType
      ? watchlistSetting.selectedType
      : 'domestic'
    : 'domestic';
  const selectedFileTypeWatchList = !isEmpty(watchlistSetting)
    ? get(watchlistSetting, 'selectedFileType', '10-K')
    : selectedTypeWatchList === 'domestic'
    ? '10-K'
    : '10-K';

  return {
    isActiveCompanies: true,
    selectedType: selectedTypeWatchList,
    selectedFileType: selectedFileTypeWatchList,
    selectedUniverse: !isEmpty(watchlistSetting) ? watchlistSetting.selectedUniverse : 'watchlist',
    selectedMetric: !isEmpty(watchlistSetting)
      ? selectedTypeWatchList === 'domestic'
        ? watchlistSetting.selectedMetric
        : 'totdoc'
      : 'totdoc',
    selectedTab: 0,
    count: 0,
    selectedSymbols: [],
    selectedItem: null,
    recentDataLoaded: false,
    overwriteCheckBox: false,
    selectedTickerSymbol: null,
    isNewWatchListDataAvailable: true,
    isOneHourComplete: false,
    isColorEnable: user ? (user.enable_watchlist_color ? user.enable_watchlist_color : false) : false,
    isEmailAlertEnable: user ? (user.send_watchlist_alert_email ? user.send_watchlist_alert_email : false) : false,
    cancelExistingDocumentTypeCalls: null,
    isFilterActive: false,
    isTickerSelected: false,
    isCompleteCompaniesDataLoaded: false,
    isCompleteCompaniesDataGlobalLoaded: false,
    completeCompaniesData: [],
    completeCompaniesDataGlobal: [],
    notifications: [],
    emailTemplate: {},
    filterLabel: '',
    selectedFilter: null,
    isFilterUpdate: false,
    userWatchlist: [],
    completeCompaniesDataIndexs: {},
    completeCompaniesDataGlobalIndexs: {}
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
    case SET_USER_WATCHLIST:
      return { ...state, userWatchlist: action.userWatchlist };
    case SET_IS_ACTIVE_COMPANIES:
      return { ...state, isActiveCompanies: action.isActiveCompanies };
    case SET_OVERWRITE_CHECK_BOX:
      return { ...state, overwriteCheckBox: action.overwriteCheckBox };
    case SET_COUNT:
      return { ...state, count: action.count };
    case SET_FILE_TYPE:
      return { ...state, selectedFileType: action.fileType };
    case SET_TYPE:
      return {
        ...state,
        selectedType: action.watchlistType,
        selectedMetric: action.watchlistType === 'global' ? 'totdoc' : state.selectedMetric,
        selectedFileType: action.watchlistType === 'global' ? '10-K' : state.selectedFileType
      };
    case SET_UNIVERSE:
      return { ...state, selectedUniverse: action.universe };
    case SET_METRIC:
      return { ...state, selectedMetric: action.metric };
    case SET_SELECTED_TAB:
      return { ...state, selectedTab: action.selectedTab };
    case SET_SELECTED_WATCHLIST:
      return { ...state, selectedItem: action.selectedItem };
    case SET_SELECTED_SYMBOLS:
      return { ...state, selectedSymbols: action.selectedSymbols };
    case SET_RECENT_DATALOADED_FLAG:
      return { ...state, recentDataLoaded: action.recentDataLoaded };
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
    case SET_IS_FILTER_ACTIVE:
      return { ...state, isFilterActive: action.isFilterActive };
    case SET_IS_TICKER_SELECTED:
      return { ...state, isTickerSelected: action.isTickerSelected };
    case SET_COMPELTE_DATALOADED_FLAG:
      return { ...state, isCompleteCompaniesDataLoaded: action.isCompleteCompaniesDataLoaded };
    case SET_COMPELTE_DATALOADED_GLOBAL_FLAG:
      return { ...state, isCompleteCompaniesDataGlobalLoaded: action.isCompleteCompaniesDataGlobalLoaded };
    case SET_COMPLETE_COMPANIES_DATA:
      return { ...state, completeCompaniesData: action.completeCompaniesData };
    case SET_COMPLETE_COMPANIES_GLOBAL_DATA:
      return { ...state, completeCompaniesDataGlobal: action.completeCompaniesDataGlobal };
    case SET_NOTIFICATION_DATA:
      return { ...state, notifications: action.notifications };
    case SET_EMAIL_TEMPLATE:
      return { ...state, emailTemplate: action.emailTemplate };
    case SET_FILTER_LABEL:
      return { ...state, filterLabel: action.filterLabel };
    case SET_SELECTED_FILTER:
      return { ...state, selectedFilter: action.selectedFilter };
    case SET_IS_FILTER_UPDATE:
      return { ...state, isFilterUpdate: action.isFilterUpdate };
    case SET_COMPLETE_COMPANIES_DATA_INDEXS:
      return { ...state, completeCompaniesDataIndexs: action.completeCompaniesDataIndexs };
    case SET_COMPLETE_COMPANIES_DATA_GLOBAL_INDEXS:
      return { ...state, completeCompaniesDataGlobalIndexs: action.completeCompaniesDataGlobalIndexs };

    default:
      break;
  }
  return state;
}
