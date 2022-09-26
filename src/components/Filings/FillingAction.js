import axios from 'axios';
import {
  setCompanyFillingData,
  setCompanyFillingGraphData,
  setCompanyFillingRevenueData,
  setCompanyPriceOverlay,
  setIsEntitiesChart,
  setIsWordCountChart
} from '../../reducers/Filings';
import { get } from 'lodash';
import config from '../../config/config';
import { getOldId, getRecentId } from '../comparision/ComparisionHelper';

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
        `${config.apiUrl}/api/get_company_filing_listing?index=${config.fillingApiIndex}${
          companyId ? `&company_id=${companyId}` : `&ticker=${ticker}`
        }`
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
    const ticker = get(selectedItem, 'ticker', null);
    dispatch(setIsWordCountChart(false));
    dispatch(setCompanyFillingGraphData([]));
    if (!ticker && !companyId) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_graph_detail?index=${config.fillingApiIndex}${
          companyId ? `&company_id=${companyId}` : `&ticker=${ticker}`
        }`
      );

      const data = get(response, 'data', []);

      if (response) {
        dispatch(setCompanyFillingGraphData(data.data));
      } else {
        dispatch(setCompanyFillingGraphData([]));
      }
      dispatch(setIsWordCountChart(true));
    } catch (error) {
      dispatch(setCompanyFillingGraphData([]));
      dispatch(setIsWordCountChart(true));
    }
  };
};

export const getCompanyFilingRevenueData = () => {
  return async (dispatch, getState) => {
    const { selectedItem, selectedFileType } = getState().Watchlist;
    const oldId = getOldId({}, selectedFileType, selectedItem);
    const recentId = getRecentId({}, selectedFileType, selectedItem);
    dispatch(setIsEntitiesChart(false));
    dispatch(setCompanyFillingRevenueData([]));
    if (!oldId || !recentId) {
      dispatch(setIsEntitiesChart(true));
      dispatch(setCompanyFillingRevenueData([]));
      return;
    }
    try {
      const response = await axios.get(`${config.fillingApiUrl}?f1=${oldId}&f2=${recentId}&output=json&v=2`);
      const data = get(response, 'data', []);
      if (response) {
        dispatch(setCompanyFillingRevenueData(data));
      } else {
        dispatch(setCompanyFillingRevenueData([]));
      }
      dispatch(setIsEntitiesChart(true));
    } catch (error) {
      dispatch(setCompanyFillingRevenueData([]));
      dispatch(setIsEntitiesChart(true));
    }
  };
};

export const getCompanyPrice0verlayOnTimeline = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;

    if (!selectedItem) {
      return;
    }
    try {
      const response = await axios.get(`${config.apiUrl}/api/get_price_by_ticker?ticker=${selectedItem.ticker}`);

      if (response) {
        const data = get(response, 'data', []);
        if (data.error) {
          dispatch(setCompanyPriceOverlay([]));
          return;
        }
        dispatch(setCompanyPriceOverlay(data));
      } else {
        dispatch(setCompanyPriceOverlay([]));
      }
    } catch (error) {
      dispatch(setCompanyPriceOverlay([]));
    }
  };
};
