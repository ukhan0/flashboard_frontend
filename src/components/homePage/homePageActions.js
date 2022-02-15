import config from '../../config/config';
import { get, round } from 'lodash';
import axios from 'axios';
import {
  setRecentCompaniesData,
  setHomePageStockData,
  setHomePagePriceData,
  setIsLoading
} from './../../reducers/HomePage';
import { formatData } from '../../components/watchlist/WatchlistHelpers';

export const getRecentCompaniesData = (selectedUniverse = 'recent') => {
  let rawData = [];

  return async dispatch => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&user_id=${user.id}&subject=${selectedUniverse}`
      );
      rawData = formatData(get(response, 'data.data.content', []));
      let recentData = [];
      rawData.forEach(d => {
        let last10kDate = new Date(d.last10k);
        let last10qDate = new Date(d.last10q);

        if (last10kDate > last10qDate) {
          recentData.push({
            ...d,
            docType: '10-K',
            sentiment: round(get(d['10k'].totdoc, 'sentiment', null), 2),
            docDate: d.last10k,
            wordCount: round(get(d['10k'].totdoc, 'sentimentChange', null), 2)
          });
        } else {
          recentData.push({
            ...d,
            docType: '10-Q',
            sentiment: round(get(d['10q'].totdoc, 'sentiment', null), 2),
            docDate: d.last10q,
            wordCount: round(get(d['10q'].totdoc, 'sentimentChange', null), 2)
          });
        }
        dispatch(setRecentCompaniesData(recentData));
      });
    } catch (e) {
      dispatch(setRecentCompaniesData([]));
      rawData = [];
    }
    return rawData;
  };
};
export const getCompanyPrice0verlayOnTimeline = () => {
  return async (dispatch, getState) => {
    const { homePageSelectedItem } = getState().HomePage;

    if (!homePageSelectedItem.ticker) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_price_by_ticker?ticker=${homePageSelectedItem.ticker}`
      );

      const data = get(response, 'data', []);
      if (response) {
        dispatch(setHomePagePriceData(data));
      } else {
        dispatch(setHomePagePriceData([]));
      }
    } catch (error) {
      dispatch(setHomePagePriceData([]));
    }
  };
};

export const getCompanyHomePageStockData = () => {
  return async (dispatch, getState) => {
    const { homePageSelectedItem } = getState().HomePage;
    const ticker = get(homePageSelectedItem, 'ticker', null);
    const companyId = get(homePageSelectedItem, 'companyId', null);
    if (!ticker && !companyId) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_listing?${companyId ? `company_id=${companyId}` : `ticker=${ticker}`}`
      );

      const data = get(response, 'data', []);
      if (response) {
        dispatch(setHomePageStockData(data.data));
        dispatch(setIsLoading(false));
      } else {
        dispatch(setHomePageStockData([]));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      dispatch(setHomePageStockData([]));
      dispatch(setIsLoading(false));
    }
  };
};
