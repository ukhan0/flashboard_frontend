export const SET_COMPANY_FILLING_DATA = 'FILLING/SET_COMPANY_FILLING_DATA ';
export const SET_COMPANY_FILLING_GRAPH_DATA = 'FILLING/SET_COMPANY_FILLING_GRAPH_DATA ';
export const SET_COMPANY_FILLING_REVENUE_DATA = 'FILLING/SET_COMPANY_FILLING_REVENUE_DATA ';
export const SET_COMPANY_PRICE_0VERLAY = 'FILLING/SET_COMPANY_PRICE_0VERLAY';
export const setCompanyFillingData = companyFillingData => ({
  type: SET_COMPANY_FILLING_DATA,
  companyFillingData
});

export const setCompanyFillingGraphData = fillingsGraphData => ({
  type: SET_COMPANY_FILLING_GRAPH_DATA,
  fillingsGraphData
});
export const setCompanyFillingRevenueData = filingsRevenueData => ({
  type: SET_COMPANY_FILLING_REVENUE_DATA,
  filingsRevenueData
});
export const setCompanyPriceOverlay = priceOverlay => ({
  type: SET_COMPANY_PRICE_0VERLAY,
  priceOverlay
});

const getDefaultState = () => {
  return {
    fillingsData: [],
    fillingsGraphData: [],
    filingsRevenueData: [],
    priceOverlay: []
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_COMPANY_FILLING_DATA:
      return { ...state, fillingsData: action.companyFillingData };
    case SET_COMPANY_FILLING_REVENUE_DATA:
      return { ...state, filingsRevenueData: action.filingsRevenueData };
    case SET_COMPANY_FILLING_GRAPH_DATA:
      return { ...state, fillingsGraphData: action.fillingsGraphData };
    case SET_COMPANY_PRICE_0VERLAY:
      return { ...state, priceOverlay: action.priceOverlay };
    default:
      break;
  }
  return state;
}
