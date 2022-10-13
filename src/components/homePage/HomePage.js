import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import HomePageSmaLime1 from './HomePageSmaLime1';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import HomePageNotification from './HomepageNotification';
import HomePageTweets from './HomePageTweets';
import { getUserWatchlist } from './HomePageAction';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.HomePage);
  React.useEffect(() => {
    dispatch(getUserWatchlist(['domestic', 'global']));
  }, [dispatch]);
  return (
    <div>
      <div className={classes.loader}> {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <HomePageTable />
        </Grid>
        <Grid item xs={6}>
          <HomePageNotification />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <HomePageSmaLime1 />
        </Grid>
        <Grid item xs={6}>
          <HomePageTweets />
        </Grid>
      </Grid>
    </div>
  );
}
