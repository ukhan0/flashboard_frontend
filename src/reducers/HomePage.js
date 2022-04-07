export const SET_HOMEPAGE_SELECTED_ITEM = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_ITEM';
export const SET_HOMEPAGE_SEARCH_INDEX = 'HOMEPAGE/SET_HOMEPAGE_SEARCH_INDEX';
export const SET_HOMEPAGE_LOADER = 'HOMEPAGE/SET_HOMEPAGE_LOADER';
export const setHomePageSelectedItem = homePageSelectedItem => ({
  type: SET_HOMEPAGE_SELECTED_ITEM,
  homePageSelectedItem
});

export const setHomePageSearchIndex = homePageSelectedSearchIndex => ({
  type: SET_HOMEPAGE_SEARCH_INDEX,
  homePageSelectedSearchIndex
});
const getDefaultState = () => {
  return {
    homePageSelectedItem: {},
    isLoading: false,
    homePageSelectedSearchIndex: { label: 'Watchlist', key: 'fillings_*', type: 'Watchlist' }
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
    default:
      break;
  }
  return state;
}
