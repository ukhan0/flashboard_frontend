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

const getDefaultState = () => {
  return {
    selectedFileType: '10k',
    selectedUniverse: 'watchlist',
    selectedMetric: 'totdoc',
    searchText: '',
    selectedTab: 0,
    count: 0,
    selectedSymbols: [],
    selectedItem: null,
    recentDataLoaded: false,
    completeDataLoaded: false
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
    default:
      break;
  }
  return state;
}
