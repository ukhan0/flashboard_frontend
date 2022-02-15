export const SET_RECENT_COMPANIES_DATA = 'HOMEPAGE/SET_RECENT_COMPANIES_DATA ';
export const SET_HOMEPAGE_STOCK_DATA = 'HOMEPAGE/SET_HOMEPAGE_STOCK_DATA ';
export const SET_HOMEPAGE_PRICE_DATA = 'HOMEPAGE/SET_HOMEPAGE_PRICE_DATA ';
export const SET_HOMEPAGE_SELECTED_ITEM = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_ITEM ';
export const SET_IS_LOADING = 'HOMEPAGE/SET_IS_LOADING ';
export const setRecentCompaniesData = recentCompaniesData => ({
  type: SET_RECENT_COMPANIES_DATA,
  recentCompaniesData
});

export const setHomePageStockData = homePageStockData => ({
  type: SET_HOMEPAGE_STOCK_DATA,
  homePageStockData
});

export const setHomePagePriceData = homePagePriceData => ({
  type: SET_HOMEPAGE_PRICE_DATA,
  homePagePriceData
});

export const setHomePageSelectedItem = homePageSelectedItem => ({
  type: SET_HOMEPAGE_SELECTED_ITEM,
  homePageSelectedItem
});
export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  isLoading
});

const getDefaultState = () => {
  return {
    recentCompaniesData: [],
    homePageStockData: [],
    homePagePriceData: [],
    homePageSelectedItem: {},
    isLoading: false
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_RECENT_COMPANIES_DATA:
      return { ...state, recentCompaniesData: action.recentCompaniesData };
    case SET_HOMEPAGE_STOCK_DATA:
      return { ...state, homePageStockData: action.homePageStockData };
    case SET_HOMEPAGE_PRICE_DATA:
      return { ...state, homePagePriceData: action.homePagePriceData };
    case SET_HOMEPAGE_SELECTED_ITEM:
      return { ...state, homePageSelectedItem: action.homePageSelectedItem };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      break;
  }
  return state;
}
