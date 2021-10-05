import React, { Fragment } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Box, Grid, Avatar, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import config from '../../config/config';
import { setIsExtermeSentiment } from '../../reducers/Sentiment';
import moment from 'moment';

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
  industry:{
    overflow:"hidden",
    textOverflow:"ellipsis",
    whiteSpace:"nowrap",
    width:"200px"

  }
}));

const SentimentCompanyDetails = props => {
  const { data, isExtremeSentiment } = useSelector(state => state.Sentiment);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeExtremeSentiment = event => {
    if (event.target.checked) {
      dispatch(setIsExtermeSentiment(true));
    } else {
      dispatch(setIsExtermeSentiment(false));
    }
  };
  return (
    <Fragment>
      <Paper className={clsx('app-page-title')}>
        <Box className={classes.tickerLogo} mr={2}>
          <Avatar alt="-" src={`${config.companyLogoPath}${get(data, 'ticker', null)}.png`} className={classes.logo} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <h5>{get(data, 'company_name', null)}</h5>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{`DocumentType:`}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6 className={classes.upperCase}>{get(data, 'document_type', null)}</h6>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Sector:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{get(data, 'gics_sector', null)}</h6>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Period Date:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{data ? moment.unix(get(data, 'completed_ts', null)).format('MM/DD/YYYY') : null}</h6>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Industry:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6 className={classes.industry}>{get(data, 'gics_industry', null)}</h6>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Publish Date:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <h6>{data ? new Date(get(data, 'document_date', null)).toLocaleDateString() : null}</h6>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <h6>{` Show Extreme Sentiments:`}&nbsp;</h6>
              </Grid>
              <Grid item>
                <Switch
                  color="primary"
                  checked={isExtremeSentiment}
                  onChange={handleChangeExtremeSentiment}
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default SentimentCompanyDetails;
