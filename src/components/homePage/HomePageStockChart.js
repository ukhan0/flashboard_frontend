import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import HomePageSearchField from './HomePageSearchField';
import { makeStyles } from '@material-ui/core/styles';
import { BeatLoader } from 'react-spinners';
import CompanyStockChart from '../Filings/CompanyStockChart';
import clsx from 'clsx';
import { get } from 'lodash';
import config from '../../config/config';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  loader: {
    textAlign: 'center',
    marginLeft: '20px',
    marginTop: '10px'
  },
  topContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  }
}));
export default function FillingCompanyPriceOverlay() {
  const classes = useStyles();
  const [stockChartData, setStockChartData] = useState([]);
  const [stockChartPriceData, setStockChartPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { homePageSelectedItem } = useSelector(state => state.HomePage);
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

  const getCompanyHomePageStockData = useCallback(async homePageSelectedItem => {
    const ticker = get(homePageSelectedItem, 'ticker', null);
    const companyId = get(homePageSelectedItem, 'companyId', null);
    if (!ticker && !companyId) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_listing?${companyId ? `company_id=${companyId}` : `ticker=${ticker}`}`
      );
      const data = get(response, 'data', []);
      if (response) {
        setStockChartData(data.data);
        setIsLoading(false);
      } else {
        setStockChartData([]);
        setIsLoading(false);
      }
    } catch (error) {
      setStockChartData([]);
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getCompanyHomePageStockData(homePageSelectedItem);
    getCompanyPrice0verlayOnTimeline(homePageSelectedItem);
  }, [homePageSelectedItem, getCompanyHomePageStockData, getCompanyPrice0verlayOnTimeline]);

  return (
    <Card className="card-box mb-4">
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Timeline</div>
        <div className="card-header--title font-weight-bold">
          <div className={classes.loader}>{<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>
        </div>
        <HomePageSearchField />
      </div>
      <div style={{ height: '530px', width: '100%' }}>
        <CompanyStockChart height={'530'} title={''} chartData={stockChartData} chartPriceData={stockChartPriceData} />
      </div>
    </Card>
  );
}
