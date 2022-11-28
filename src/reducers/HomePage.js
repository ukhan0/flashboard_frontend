export const SET_HOMEPAGE_SELECTED_ITEM = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_ITEM';
export const SET_HOMEPAGE_SEARCH_INDEX = 'HOMEPAGE/SET_HOMEPAGE_SEARCH_INDEX';
export const SET_HOMEPAGE_LOADER = 'HOMEPAGE/SET_HOMEPAGE_LOADER';
export const HIDE_HOMEPAGE_LOADER = 'HOMEPAGE/HIDE_HOMEPAGE_LOADER';
export const SET_HOMEPAGE_WATCHLIST_DOMESTIC = 'HOMEPAGE/SET_HOMEPAGE_DOMESTIC';
export const SET_HOMEPAGE_WATCHLIST_GLOBAL = 'HOMEPAGE/SET_HOMEPAGE_GLOBAL';
export const SET_HOMEPAGE_SELECTED_WIDGET_REGION = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_WIDGET_REGION';

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
export const setHomePageSelectedWidgetRegion = selectedWidgetRegion => ({
  type: SET_HOMEPAGE_SELECTED_WIDGET_REGION,
  selectedWidgetRegion
});
const getDefaultState = () => {
  return {
    homePageSelectedItem: {},
    isLoading: 0,
    homePageSelectedSearchIndex: { label: 'SEDAR', key: 'fillings_sedar*', type: 'SEDAR' },
    domesticWatchlist: [],
    globalWatchlist: [],
    homePageSelectedWidgetRegion: { id: 1, label: 'Canada', type: 'Canada' }
  };
};
export const setHomePageLoader = isLoading => ({
  type: SET_HOMEPAGE_LOADER,
  isLoading
});
export const hideHomePageLoader = isLoading => ({
  type: HIDE_HOMEPAGE_LOADER,
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
      return { ...state, isLoading: state.isLoading + 1 };
    case HIDE_HOMEPAGE_LOADER:
      return { ...state, isLoading: state.isLoading - 1 };
    case SET_HOMEPAGE_WATCHLIST_DOMESTIC:
      return { ...state, domesticWatchlist: action.domesticWatchlist };
    case SET_HOMEPAGE_WATCHLIST_GLOBAL:
      return { ...state, globalWatchlist: action.globalWatchlist };
    case SET_HOMEPAGE_SELECTED_WIDGET_REGION:
      return { ...state, homePageSelectedWidgetRegion: action.selectedWidgetRegion };
    default:
      break;
  }
  return state;
}
