import React, { Fragment } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Paper, Box, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import config from '../../config/config';
import { renameDocumentTypes } from '../topic/topicHelpers';
import SentimentFilters from './SentimentFiltres';
import { dateFormaterMoment, parseDateStrMoment } from '../watchlist/WatchlistTableHelpers';

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
  industry: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '200px'
  }
}));

const SentimentCompanyDetails = props => {
  const { data } = useSelector(state => state.Sentiment);
  const classes = useStyles();

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
                <h6 className={classes.upperCase}>{renameDocumentTypes(get(data, 'document_type', null))}</h6>
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
                <h6>{data ? dateFormaterMoment(parseDateStrMoment(get(data, 'period_date', null))) : null}</h6>
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
                <h6>{data ? dateFormaterMoment(parseDateStrMoment(get(data, 'document_date', null))) : null}</h6>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label style={{ marginTop: '6px' }} className="text-black-50 d-block">
                  {'Sentiment:'}&nbsp;
                </label>
              </Grid>
              <Grid item>
                <SentimentFilters />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default SentimentCompanyDetails;
