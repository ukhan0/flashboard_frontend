import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import CompanyStockChart from './HomePageStockChart';
export default function HomePage() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <HomePageTable />
        </Grid>
        <Grid item xs={6}>
          <CompanyStockChart />
        </Grid>
      </Grid>
    </div>
  );
}
