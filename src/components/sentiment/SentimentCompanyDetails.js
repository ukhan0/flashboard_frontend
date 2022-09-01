import React, { Fragment } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Paper, Box, Grid, Avatar, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import config from '../../config/config';
import { renameDocumentTypes } from '../topic/topicHelpers';
import SentimentFilters from './SentimentFiltres';
import { dateFormaterMoment, parseDateStrMoment } from '../watchlist/WatchlistTableHelpers';
import { sentimentVersions } from '../../config/filterTypes';
import SentimentHighlights from './SentimentHighlight';
const useStyles = makeStyles(theme => ({
  tickerLogo: {
    display: 'flex',
    height: 70,
    alignItems: 'center', 
    '& .MuiAvatar-img': {
      objectFit: 'contain'
    }
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
  const { data, isHighLightedText } = useSelector(state => state.Sentiment);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const classes = useStyles();
  // const documentId = get(selectedItem, 'documentId', null);
  const isDisabled = (item, sentimentV) => {
    let status = false;
    status =
      get(item, 'documentType', '').toLowerCase() === 'FMP-Transcript'.toLowerCase() &&
      sentimentV.key === 'original' &&
      props.highlightsData.length > 0
        ? true
        : false;
    return status;
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
                <h6 className={classes.upperCase}>{renameDocumentTypes(get(data, 'document_type', ''))}</h6>
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
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <label className="text-black-50 d-block">{'Version:'}&nbsp;</label>
              </Grid>
              <Grid item>
                <ButtonGroup color="primary" style={{ paddingLeft: '17px' }}>
                  {sentimentVersions.map((sentimentV, i) => (
                    <Button
                      size="small"
                      key={`sent_${i}`}
                      disabled={isDisabled(selectedItem, sentimentV)}
                      onClick={() => props.handleClickSentimentVersion(sentimentV.key)}
                      variant={props.sentimentVesion === sentimentV.key ? 'contained' : 'outlined'}>
                      {sentimentV.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center" style={{ paddingTop: '5px' }}>
              <Grid item>
                <label style={{ marginTop: '6px' }} className="text-black-50 d-block">
                  {'Sentiment:'}&nbsp;
                </label>
              </Grid>
              <Grid item>
                <SentimentFilters disable={props.disable} />
              </Grid>
            </Grid>
            {isHighLightedText && props.sentimentV === 'flatText' ? (
              <SentimentHighlights
                highlightsData={props.highlightsData}
                clickHandle={props.clickHandle}
                newTest={props.newTest}
                is_first_iteration={props.is_first_iteration}
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default SentimentCompanyDetails;
