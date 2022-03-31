import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import CompanyStockChart from './HomePageStockChart';
import HomePageHeatMap from './HomePageHeatMap';
import HomePageSmaLime1 from './HomePageSmaLime1';
import HomePageSmaLime2 from './HomePageSmaLime2';
export default function HomePage() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <HomePageTable />
        </Grid>
        <Grid item xs={4}>
          <CompanyStockChart />
        </Grid>
        <Grid item xs={4}>
          <HomePageHeatMap />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <HomePageSmaLime1 />
        </Grid>
        <Grid item xs={4}>
          <HomePageSmaLime2 />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}
