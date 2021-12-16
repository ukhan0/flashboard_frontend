import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData, getSentimentHighlights } from './sentimentActions';
import { useHistory } from 'react-router-dom';
import SentimentContentSection from './SentimentContentSection';
import SentimentTableOfContent from './SentimentTableOfContent';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import cjson from 'compressed-json';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { getCompanyFilingGraphData } from '../Filings/FillingAction';
import config from '../../config/config';
const useStyles = makeStyles(theme => ({
  tableOfContent: {
    position: 'sticky',
    top: 50,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Sentiment = () => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { isPin } = useSelector(state => state.Sentiment);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const firstTimeLoad = useRef(false);
  let hideCards = config.hideCard;
  let getQueryParams = new URLSearchParams(useLocation().search);
  if (!getQueryParams.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }
  useEffect(() => {
    if (!firstTimeLoad.current) {
      firstTimeLoad.current = true;
      if (getQueryParams.get('recentId')) {
        let ticker = getQueryParams.get('ticker');
        const localSelectedItem = getCompanyByTicker(ticker);
        if (localSelectedItem) {
          let company = formatComapnyData(localSelectedItem);
          company.recentId = getQueryParams.get('recentId');
          dispatch(setSelectedWatchlist(company));
        }
      }
    }
  }, [dispatch, getQueryParams]);

  useEffect(() => {
    if (selectedItem) {
      dispatch(getSentimentData());
      dispatch(getSentimentHighlights());
      if (hideCards === 'true') {
        dispatch(getCompanyFilingGraphData());
      }
    }
  }, [dispatch, selectedItem, hideCards]);

  const handleSelection = path => {
    setTimeout(() => {
      document.getElementById(path).scrollIntoView();
    }, 100);
  };

  const getCompanyByTicker = ticker => {
    let rawData = localStorage.getItem(`watchlist-data-all`);
    if (rawData) {
      rawData = cjson.decompress.fromString(rawData);
    }
    let company = rawData.find(sd => sd.ticker === ticker);
    return company;
  };

  return (
    <>
      {isPin ? (
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <div className={classes.companyDetail}>
              <SentimentContentSection />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.tableOfContent}>
              <SentimentTableOfContent onSelection={handleSelection} />
            </div>
          </Grid>
        </Grid>
      ) : (
        <SentimentContentSection />
      )}
    </>
  );
};

export default Sentiment;
