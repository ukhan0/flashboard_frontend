import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import { getRecentCompaniesData } from './homePageActions';
import { useDispatch } from 'react-redux';
import HomeStockChart from './HomePageStockChart';

export default function HomePage() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getRecentCompaniesData());
  }, [dispatch]);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <HomePageTable />
        </Grid>
        <Grid item xs={6}>
          <HomeStockChart />
        </Grid>
        {/* <Grid item xs={4}>
        <StockChatr/>
        </Grid> */}
      </Grid>
    </div>
  );
}
