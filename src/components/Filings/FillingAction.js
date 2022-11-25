import axios from 'axios';
import {
  setCompanyFillingData,
  setCompanyFillingGraphData,
  setCompanyFillingRevenueData,
  setCompanyPriceOverlay,
  setIsWordCountChart,
  clearFilingsStates
} from '../../reducers/Filings';
import { get } from 'lodash';
import config from '../../config/config';
import { getOldId, getRecentId } from '../comparision/ComparisionHelper';
import { renameDocumentTypeNames } from '../topic/topicHelpers';
import { parseDateAndFormatMoment } from '../watchlist/WatchlistTableHelpers';

let cancelTokens = [];

export const getCompanyFilingListing = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;
    const ticker = get(selectedItem, 'ticker', null);
    const companyId = get(selectedItem, 'companyId', null);
    if (!ticker && !companyId) {
      return;
    }
    try {
      const filingListingCancelToken = axios.CancelToken.source();
      cancelTokens.push(filingListingCancelToken);
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_listing?index=${config.fillingApiIndex}${
          companyId ? `&company_id=${companyId}` : `&ticker=${ticker}`
        }`,
        {
          cancelToken: filingListingCancelToken.token
        }
      );

      const dataArr = get(response, 'data.data', []);
      if (dataArr.length) {
        dataArr.forEach((data, i) => {
          dataArr[i].document_type = renameDocumentTypeNames(data.document_type);
          dataArr[i].document_date = data.document_date ? parseDateAndFormatMoment(data.document_date) : '';
          dataArr[i].period_date = data.period_date ? parseDateAndFormatMoment(data.period_date) : '';
        });
        dispatch(setCompanyFillingData(dataArr));
      } else {
        dispatch(setCompanyFillingData([]));
      }
    } catch (error) {}
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
      const graphDetailCancelToken = axios.CancelToken.source();
      cancelTokens.push(graphDetailCancelToken);
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_graph_detail?index=${config.fillingApiIndex}${
          companyId ? `&company_id=${companyId}` : `&ticker=${ticker}`
        }`,
        {
          cancelToken: graphDetailCancelToken.token
        }
      );

      const data = get(response, 'data', []);

      if (response) {
        dispatch(setCompanyFillingGraphData(data.data));
      } else {
        dispatch(setCompanyFillingGraphData([]));
      }
      dispatch(setIsWordCountChart(true));
    } catch (error) {}
  };
};

export const getCompanyFilingRevenueData = () => {
  return async (dispatch, getState) => {
    const { selectedItem, selectedFileType } = getState().Watchlist;
    const oldId = getOldId({}, selectedFileType, selectedItem);
    const recentId = getRecentId({}, selectedFileType, selectedItem);
    if (!oldId || !recentId) {
      dispatch(setCompanyFillingRevenueData([]));
      return;
    }
    try {
      const comparnerCancelToken = axios.CancelToken.source();
      cancelTokens.push(comparnerCancelToken);
      const response = await axios.get(`${config.fillingApiUrl}?f1=${oldId}&f2=${recentId}&output=json`, {
        cancelToken: comparnerCancelToken.token
      });
      const data = get(response, 'data', []);
      if (response) {
        dispatch(setCompanyFillingRevenueData(data));
      } else {
        dispatch(setCompanyFillingRevenueData([]));
      }
    } catch (error) {}
  };
};

export const getCompanyPrice0verlayOnTimeline = () => {
  return async (dispatch, getState) => {
    const { selectedItem } = getState().Watchlist;

    if (!selectedItem) {
      return;
    }
    try {
      const priceByTickerCancelToken = axios.CancelToken.source();
      cancelTokens.push(priceByTickerCancelToken);
      const response = await axios.get(`${config.apiUrl}/api/get_price_by_ticker?ticker=${selectedItem.ticker}`, {
        cancelToken: priceByTickerCancelToken.token
      });

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
    } catch (error) {}
  };
};

export const clearStateAndCancelApiCalls = () => {
  return async dispatch => {
    dispatch(clearFilingsStates());
    cancelTokens.forEach(token => {
      token.cancel();
    });
    cancelTokens = [];
  };
};
