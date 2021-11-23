import { filingsData, revenueMockData } from './filingsMockData';

export const SET_COMPANY_FILLING_DATA = 'FILLING/SET_COMPANY_FILLING_DATA ';
export const SET_COMPANY_FILLING_GRAPH_DATA = 'FILLING/SET_COMPANY_FILLING_GRAPH_DATA ';
export const SET_COMPANY_FILLING_REVENUE_DATA = 'FILLING/SET_COMPANY_FILLING_REVENUE_DATA ';
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

const getDefaultState = () => {
  return {
    filingsData: filingsData,
    fillingsData: [],
    fillingsGraphData: [],
    filingsRevenueData: revenueMockData
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
    default:
      break;
  }
  return state;
}
