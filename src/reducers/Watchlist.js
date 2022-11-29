import { getWatchlistSettings } from '../components/watchlist/WatchlistHelpers';
import { get } from 'lodash';
export const SET_FILE_TYPE = 'WATCHLIST/SET_FILE_TYPE';
export const SET_TYPE = 'WATCHLIST/SET_TYPE';
export const SET_UNIVERSE = 'WATCHLIST/SET_UNIVERSE';
export const SET_METRIC = 'WATCHLIST/SET_METRIC';
export const SET_SELECTED_TAB = 'WATCHLIST/SET_SELECTED_TAB';
export const SET_SELECTED_WATCHLIST = 'WATCHLIST/SET_SELECTED_WATCHLIST';
export const SET_SELECTED_SYMBOLS = 'WATCHLIST/SET_SELECTED_SYMBOLS';
export const RESET_WATCHLIST = 'WATCHLIST/RESET_WATCHLIST';
export const SET_COMPELTE_DATALOADED_FLAG = 'WATCHLIST/SET_COMPELTE_DATALOADED_FLAG';
export const SET_COMPELTE_DATALOADED_GLOBAL_FLAG = 'WATCHLIST/SET_COMPELTE_DATALOADED_GLOBAL_FLAG';
export const SET_OVERWRITE_CHECK_BOX = 'WATCHLIST/SET_OVERWRITE_CHECK_BOX';
export const SET_IS_COLOR_ENABLE = 'WATCHLIST/SET_IS_COLOR_ENABLE';
export const SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE = 'WATCHLIST/SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE';
export const SET_IS_FILTER_ACTIVE = 'WATCHLIST/SET_IS_FILTER_ACTIVE';
export const SET_COMPLETE_COMPANIES_DATA = 'WATCHLIST/SET_COMPLETE_COMPANIES_DATA';
export const SET_COMPLETE_COMPANIES_GLOBAL_DATA = 'WATCHLIST/SET_COMPLETE_COMPANIES_GLOBAL_DATA';
export const SET_NOTIFICATION_DATA = 'WATCHLIST/SET_NOTIFICATION_DATA';
export const SET_EMAIL_TEMPLATE = 'WATCHLIST/SET_EMAIL_TEMPLATE';
export const SET_FILTER_LABEL = 'WATCHLIST/SET_FILTER_LABEL';
export const SET_SELECTED_FILTER = 'WATCHLIST/SET_SELECTED_FILTER';
export const SET_IS_FILTER_UPDATE = 'WATCHLIST/SET_IS_FILTER_UPDATE';
export const SET_IS_ACTIVE_COMPANIES = 'WATCHLIST/SET_IS_ACTIVE_COMPANIES';
export const SET_USER_WATCHLIST = 'WATCHLIST/SET_USER_WATCHLIST';
export const SET_WATCHLIST_FILE_TYPE_EMAIL_ALERTS = 'WATCHLIST/SET_WATCHLIST_FILE_TYPE_EMAIL_ALERTS';

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
export const resetWatchlist = () => ({
  type: RESET_WATCHLIST
});
export const setIsColorEnable = isColorEnable => ({
  type: SET_IS_COLOR_ENABLE,
  isColorEnable
});
export const setIsWatchlistEmailAlertEnable = isEmailAlertEnable => ({
  type: SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE,
  isEmailAlertEnable
});
export const setIsFilterActive = isFilterActive => ({
  type: SET_IS_FILTER_ACTIVE,
  isFilterActive
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
export const setWatchlistFileTypeEmailAlerts = watchlistFileTypeEmailAlerts => ({
  type: SET_WATCHLIST_FILE_TYPE_EMAIL_ALERTS,
  watchlistFileTypeEmailAlerts
});

const getDefaultState = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const watchlistSetting = getWatchlistSettings();
  return {
    isActiveCompanies: true,
    selectedType: get(watchlistSetting, 'selectedType', 'global'),
    selectedFileType: get(watchlistSetting, 'selectedFileType', '10-K'),
    selectedUniverse: get(watchlistSetting, 'selectedUniverse', 'all'),
    selectedMetric: get(watchlistSetting, 'selectedMetric', 'totdoc'),
    selectedTab: 0,
    selectedSymbols: [],
    selectedItem: null,
    overwriteCheckBox: false,
    isColorEnable: get(user, 'enable_watchlist_color', false),
    isEmailAlertEnable: get(user, 'send_watchlist_alert_email', false),
    isFilterActive: false,
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
    watchlistFileTypeEmailAlerts: []
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_USER_WATCHLIST:
      return { ...state, userWatchlist: action.userWatchlist };
    case SET_IS_ACTIVE_COMPANIES:
      return { ...state, isActiveCompanies: action.isActiveCompanies };
    case SET_OVERWRITE_CHECK_BOX:
      return { ...state, overwriteCheckBox: action.overwriteCheckBox };
    case SET_FILE_TYPE:
      return { ...state, selectedFileType: action.fileType };
    case SET_TYPE:
      return {
        ...state,
        selectedType: action.watchlistType,
        selectedMetric: action.watchlistType === 'global' ? 'totdoc' : state.selectedMetric
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
    case RESET_WATCHLIST:
      return { ...state, ...getDefaultState() };
    case SET_IS_COLOR_ENABLE:
      return { ...state, isColorEnable: action.isColorEnable };
    case SET_IS_WATCHLIST_EMAIL_ALERT_ENABLE:
      return { ...state, isEmailAlertEnable: action.isEmailAlertEnable };
    case SET_IS_FILTER_ACTIVE:
      return { ...state, isFilterActive: action.isFilterActive };
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
    case SET_WATCHLIST_FILE_TYPE_EMAIL_ALERTS:
      return { ...state, watchlistFileTypeEmailAlerts: action.watchlistFileTypeEmailAlerts };
    default:
      break;
  }
  return state;
}
