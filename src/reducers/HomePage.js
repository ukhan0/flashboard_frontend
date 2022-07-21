export const SET_HOMEPAGE_SELECTED_ITEM = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_ITEM';
export const SET_HOMEPAGE_SEARCH_INDEX = 'HOMEPAGE/SET_HOMEPAGE_SEARCH_INDEX';
export const SET_HOMEPAGE_LOADER = 'HOMEPAGE/SET_HOMEPAGE_LOADER';
export const SET_HOMEPAGE_WATCHLIST_DOMESTIC = 'HOMEPAGE/SET_HOMEPAGE_DOMESTIC';
export const SET_HOMEPAGE_WATCHLIST_GLOBAL = 'HOMEPAGE/SET_HOMEPAGE_GLOBAL';
export const setHomePageSelectedItem = homePageSelectedItem => ({
  type: SET_HOMEPAGE_SELECTED_ITEM,
  homePageSelectedItem
});

export const setHomePageSearchIndex = homePageSelectedSearchIndex => ({
  type: SET_HOMEPAGE_SEARCH_INDEX,
  homePageSelectedSearchIndex
});
export const setHomePageWatchlistDomestic = domesticWatchlist => ({
  type: SET_HOMEPAGE_WATCHLIST_DOMESTIC,
  domesticWatchlist
});
export const setHomePageWatchlistGlobal = globalWatchlist => ({
  type: SET_HOMEPAGE_WATCHLIST_GLOBAL,
  globalWatchlist
});
const getDefaultState = () => {
  return {
    homePageSelectedItem: {},
    isLoading: false,
    homePageSelectedSearchIndex: { label: 'Watchlist', key: 'fillings_*', type: 'Watchlist' },
    domesticWatchlist: [],
    globalWatchlist: []
  };
};
export const setHomePageLoader = isLoading => ({
  type: SET_HOMEPAGE_LOADER,
  isLoading
});

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_HOMEPAGE_SELECTED_ITEM:
      return { ...state, homePageSelectedItem: action.homePageSelectedItem };
    case SET_HOMEPAGE_SEARCH_INDEX:
      return { ...state, homePageSelectedSearchIndex: action.homePageSelectedSearchIndex };
    case SET_HOMEPAGE_LOADER:
      return { ...state, isLoading: action.isLoading };
    case SET_HOMEPAGE_WATCHLIST_DOMESTIC:
      return { ...state, domesticWatchlist: action.domesticWatchlist };
    case SET_HOMEPAGE_WATCHLIST_GLOBAL:
      return { ...state, globalWatchlist: action.globalWatchlist };
    default:
      break;
  }
  return state;
}
