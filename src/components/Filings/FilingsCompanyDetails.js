import React, { Fragment } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { get } from 'lodash';
import config from '../../config/config';

const useStyles = makeStyles(theme => ({
  tickerLogo: {
    display: 'flex',
    height: 70,
    alignItems: 'center'
  },
  logo: {
    height: 70,
    width: 70
  },
  upperCase: {
    textTransform: 'uppercase'
  },
  paper: {
    padding: 10
  }
}));

const FilingsCompanyDetails = props => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const classes = useStyles();

  return (
    <Fragment>
      <Paper className={clsx('app-page-title')}>
        <Box className={classes.tickerLogo} mr={2}>
          <Avatar
            alt="-"
            src={`${config.companyLogoPath}${get(selectedItem, 'ticker', null)}.png`}
            className={classes.logo}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <h5>{get(selectedItem, 'companyName', null)}</h5>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Sector:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{get(selectedItem, 'sector', null)}</h6>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Industry:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{get(selectedItem, 'industry', null)}</h6>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default React.memo(FilingsCompanyDetails);
