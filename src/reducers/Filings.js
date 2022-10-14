export const SET_COMPANY_FILLING_DATA = 'FILLING/SET_COMPANY_FILLING_DATA ';
export const SET_COMPANY_FILLING_GRAPH_DATA = 'FILLING/SET_COMPANY_FILLING_GRAPH_DATA ';
export const SET_COMPANY_FILLING_REVENUE_DATA = 'FILLING/SET_COMPANY_FILLING_REVENUE_DATA ';
export const SET_COMPANY_PRICE_0VERLAY = 'FILLING/SET_COMPANY_PRICE_0VERLAY';
export const SET_FILLINGS_SEARCH_TEXT = 'FILLING/SET_FILLINGS_SEARCH_TEXT';
export const SET_IS_WORD_COUNT_CHART = 'FILLING/SET_IS_WORD_COUNT_CHART';
export const CLEAR_FILINGS_STATES = 'FILLING/CLEAR_FILINGS_STATES';
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
export const setFillingsSearchText = fillingsSearchText => ({
  type: SET_FILLINGS_SEARCH_TEXT,
  fillingsSearchText
});
export const setIsWordCountChart = isWordCountChart => ({
  type: SET_IS_WORD_COUNT_CHART,
  isWordCountChart
});

export const clearFilingsStates = () => ({
  type: CLEAR_FILINGS_STATES
});

const getDefaultState = () => {
  return {
    fillingsData: [],
    fillingsGraphData: [],
    filingsRevenueData: [],
    priceOverlay: [],
    fillingsSearchText: '',
    isWordCountChart: false
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
    case SET_FILLINGS_SEARCH_TEXT:
      return { ...state, fillingsSearchText: action.fillingsSearchText };
    case SET_IS_WORD_COUNT_CHART:
      return { ...state, isWordCountChart: action.isWordCountChart };
    case CLEAR_FILINGS_STATES:
      return { ...state, fillingsData: [], fillingsGraphData: [], filingsRevenueData: [], priceOverlay: [] };

    default:
      break;
  }
  return state;
}
