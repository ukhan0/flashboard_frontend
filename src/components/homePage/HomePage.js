import React from 'react';
import { Grid } from '@material-ui/core';
import HomePageTable from './HomePageTable';
import HomePageSmaLime1 from './HomePageSmaLime1';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SnackBar from '../Snackbar';
import { get } from 'lodash';
import HomePageNotification from './HomepageNotification';
import HomePageTweets from './HomePageTweets';
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
  const [snackbar, setSnackBar] = React.useState(null);
  const { isLoading } = useSelector(state => state.HomePage);
  const anchorOrigin = { vertical: 'top', horizontal: 'center' };
  const handleSnackBar = data => {
    setSnackBar(data);
  };
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
          <SnackBar
            open={get(snackbar, 'isSnackBar', false)}
            onClose={() =>
              setSnackBar({
                isSnackBar: false,
                message: get(snackbar, 'message', null),
                severity: get(snackbar, 'severity', '')
              })
            }
            message={get(snackbar, 'message', null)}
            severity={get(snackbar, 'severity', '')}
            anchorOrigin={anchorOrigin}
          />
          <HomePageSmaLime1 handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid item xs={6}>
          <HomePageTweets />
        </Grid>
      </Grid>
    </div>
  );
}
