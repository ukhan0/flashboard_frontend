import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';
import HomePageSearchField from './HomePageSearchField';
import CompanyStockChart from '../Filings/CompanyStockChart';
import clsx from 'clsx';
import { get } from 'lodash';
import config from '../../config/config';
import axios from 'axios';
import { setHomePageLoader } from '../../reducers/HomePage';

export default function FillingCompanyPriceOverlay(props) {
  const [stockChartData, setStockChartData] = useState([]);
  const [stockChartPriceData, setStockChartPriceData] = useState([]);
  const { homePageSelectedItem } = useSelector(state => state.HomePage);
  const dispatch = useDispatch();
  const getCompanyPrice0verlayOnTimeline = useCallback(async homePageSelectedItem => {
    if (!homePageSelectedItem.ticker) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_price_by_ticker?ticker=${homePageSelectedItem.ticker}`
      );
      const data = get(response, 'data', []);
      if (response) {
        setStockChartPriceData(data);
      } else {
        setStockChartPriceData([]);
      }
    } catch (error) {
      setStockChartPriceData([]);
    }
  }, []);

  const getCompanyHomePageStockData = useCallback(
    async homePageSelectedItem => {
      const ticker = get(homePageSelectedItem, 'ticker', null);
      const companyId = get(homePageSelectedItem, 'companyId', null);
      if (!ticker && !companyId) {
        return;
      }
      dispatch(setHomePageLoader(true));

      try {
        const response = await axios.get(
          `${config.apiUrl}/api/get_company_filing_listing?index=fillings_*&${
            companyId ? `company_id=${companyId}` : `ticker=${ticker}`
          }`
        );
        const data = get(response, 'data', []);
        if (response) {
          setStockChartData(data.data);
          dispatch(setHomePageLoader(false));
        } else {
          setStockChartData([]);
          dispatch(setHomePageLoader(false));
        }
      } catch (error) {
        setStockChartData([]);
        dispatch(setHomePageLoader(false));
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    getCompanyHomePageStockData(homePageSelectedItem);
    getCompanyPrice0verlayOnTimeline(homePageSelectedItem);
  }, [homePageSelectedItem, getCompanyHomePageStockData, getCompanyPrice0verlayOnTimeline]);

  return (
    <Card className="card-box mb-4" style={{ height: '600px' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Timeline</div>
        <div className="card-header--title font-weight-bold"></div>
        <HomePageSearchField />
      </div>
      <div style={{ height: '540px', width: '100%' }}>
        <CompanyStockChart height={'545'} title={''} chartData={stockChartData} chartPriceData={stockChartPriceData} />
      </div>
    </Card>
  );
}
