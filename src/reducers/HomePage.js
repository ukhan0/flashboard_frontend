export const SET_HOMEPAGE_LOADER = 'HOMEPAGE/SET_HOMEPAGE_LOADER';
export const HIDE_HOMEPAGE_LOADER = 'HOMEPAGE/HIDE_HOMEPAGE_LOADER';
export const SET_HOMEPAGE_WATCHLIST_DOMESTIC = 'HOMEPAGE/SET_HOMEPAGE_DOMESTIC';
export const SET_HOMEPAGE_WATCHLIST_GLOBAL = 'HOMEPAGE/SET_HOMEPAGE_GLOBAL';
export const SET_HOMEPAGE_SELECTED_WIDGET_REGION = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_WIDGET_REGION';

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
    isLoading: 0,
    domesticWatchlist: [],
    globalWatchlist: [],
    homePageSelectedWidgetRegion:
      process.env?.REACT_APP_DOMAIN_NAME === 'TMX'
        ? { id: 1, label: 'Canada', type: 'Canada' }
        : { id: 2, label: 'U.S.', type: 'US' }
  };
};
export const setHomePageLoader = () => ({
  type: SET_HOMEPAGE_LOADER
});
export const hideHomePageLoader = () => ({
  type: HIDE_HOMEPAGE_LOADER
});

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
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
