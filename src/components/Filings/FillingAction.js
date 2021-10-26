import axios from 'axios';
import { setCompanyFillingData } from '../../reducers/Filings';
import { get } from 'lodash';
import config from '../../config/config';

export const getCompanyFilingListing = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const ticker = get(selectedItem, 'ticker', null);
    const companyId = get(selectedItem, 'companyId', null);
    if (!ticker && !companyId) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_listing/?${companyId ? `company_id=${companyId}` : `ticker=${ticker}`}`
      );

      const data = get(response, 'data', []);
      if (response) {
        dispatch(setCompanyFillingData(data.data));
      } else {
        dispatch(setCompanyFillingData([]));
      }
    } catch (error) {
      dispatch(setCompanyFillingData([]));
    }
  };
};
