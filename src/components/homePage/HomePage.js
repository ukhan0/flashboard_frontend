import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import HomePageHeatMap from './HomePageHeatMap';
import HomePageSmaLime1 from './HomePageSmaLime1';
import { Card } from '@material-ui/core';
import avatar from '../../config/homepic.png';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import StockChart from './HomePageStockChart';
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
        <Grid item xs={8}>
          <HomePageTable />
        </Grid>
        <Grid item xs={4}>
          <HomePageHeatMap />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <StockChart />
        </Grid>
        <Grid item xs={4}>
          <HomePageSmaLime1 />
        </Grid>
        <Grid item xs={4}>
          <Card className="card-box mb-4" style={{ maxHeight: '600px' }}>
            <div style={{ float: 'left', outline: '1px solid gray', margin: '10px', borderradius: '8px' }}>
              <div className="card-header--title font-weight-bold">Social Stream</div>
              <div style={{ height: '465px', width: '600px', margin: ' 16px' }}>
                <img style={{ width: '100%' }} alt="..." src={avatar} />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
