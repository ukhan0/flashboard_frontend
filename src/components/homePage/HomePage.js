import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import CompanyStockChart from './HomePageStockChart';
import HomePageHeatMap from './HomePageHeatMap';
import HomePageSmaLime1 from './HomePageSmaLime1';
import HomePageSmaLime2 from './HomePageSmaLime2';
import { Card } from '@material-ui/core';
import avatar from '../../config/homepic.png';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  loader: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: 10,
    left: 0,
    right: 0
  }
});
export default function HomePage() {
  const classes = useStyle();
  const { isLoading } = useSelector(state => state.HomePage);
  return (
    <div>
      <div className={classes.loader}> {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>
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
        <Grid item xs={4}>
          <Card className="card-box mb-4">
            <div style={{ float: 'left', outline: '1px solid gray', margin: '10px', borderradius: '8px' }}>
              <h2 className="card-header--title font-weight-bold">Social Stream</h2>
              <div style={{ height: '450px', width: '600px', margin: ' 16px' }}>
                <img style={{ width: '100%' }} alt="..." src={avatar} />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
