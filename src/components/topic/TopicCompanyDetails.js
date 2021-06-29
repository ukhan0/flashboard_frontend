import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Paper, Box, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  }
}));

const TopicComapnyDetails = props => {
  const classes = useStyles();
  const companyDetail = props.companyDetail;
  return (
    <Fragment>
      <Paper className={clsx('app-page-title')}>
        <Box className={classes.tickerLogo} mr={2}>
          <Avatar alt="-" src={`${config.companyLogoPath}${companyDetail.ticker}.png`} className={classes.logo} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <h5>{companyDetail.companyName}</h5>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Sector:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{companyDetail.sector}</h6>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Industry:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{companyDetail.industry}</h6>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default TopicComapnyDetails;
