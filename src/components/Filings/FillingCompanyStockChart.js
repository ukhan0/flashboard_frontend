import React from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import CompanyStockChart from './CompanyStockChart';

export default function FillingCompanyPriceOverlay() {
  const { priceOverlay, fillingsData } = useSelector(state => state.Filings);
  return (
    <Paper className={clsx('app-page-title')}>
      <div style={{ height: '100%', width: '100%' }}>
        <CompanyStockChart title={'Timeline'} chartData={fillingsData} chartPriceData={priceOverlay} />
      </div>
    </Paper>
  );
}
