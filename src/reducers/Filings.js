import { filingsData } from './filingsMockData';

export const SET_COMPANY_FILLING_DATA = 'FILLING/SET_COMPANY_FILLING_DATE ';

export const setCompanyFillingData = companyFillingData => ({
  type: SET_COMPANY_FILLING_DATA,
  companyFillingData
});

const getDefaultState = () => {
  return {
    filingsData: filingsData,
    fillingsData: []
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
    default:
      break;
  }
  return state;
}
