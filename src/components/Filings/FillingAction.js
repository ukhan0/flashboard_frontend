import axios from 'axios';
import {
  setCompanyFillingData,
  setCompanyFillingGraphData,
  setCompanyFillingRevenueData
} from '../../reducers/Filings';
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
        `${config.apiUrl}/api/get_company_filing_listing?${companyId ? `company_id=${companyId}` : `ticker=${ticker}`}`
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

export const getCompanyFilingGraphData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const companyId = get(selectedItem, 'companyId', null);
    const companyName = get(selectedItem, 'companyName', null);

    if (!companyName && !companyId) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_graph_detail?
        ${companyId ? `company_id=${companyId}` : `company_name=${escape(companyName)}`}`
      );

      const data = get(response, 'data', []);
      if (response) {
        dispatch(setCompanyFillingGraphData(data.data));
      } else {
        dispatch(setCompanyFillingGraphData([]));
      }
    } catch (error) {
      dispatch(setCompanyFillingGraphData([]));
    }
  };
};

export const getCompanyFilingRevenueData = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;

    if (!selectedItem) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.fillingApiUrl}?f1=${selectedItem.oldId}&f2=${selectedItem.recentId}&output=json`
      );

      const data = get(response, 'data', []);
      if (response) {
        let parseData = JSON.parse(data.data);

        dispatch(setCompanyFillingRevenueData(parseData));
      } else {
        dispatch(setCompanyFillingRevenueData([]));
      }
    } catch (error) {
      dispatch(setCompanyFillingRevenueData([]));
    }
  };
};
