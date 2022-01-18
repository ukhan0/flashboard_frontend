import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
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
import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  tableOfContent: {
    position: 'sticky',
    top: 50,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  loaderSection: {
    textAlign: 'center'
  }
}));

const Sentiment = () => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { isPin, sentimentRecentId } = useSelector(state => state.Sentiment);
  const [isLoading, setIsLoading] = useState(true);
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
        getCompanyByTicker(ticker).then(localSelectedItem => {
          if (localSelectedItem) {
            let company = formatComapnyData(localSelectedItem);
            company.recentId = getQueryParams.get('recentId');
            dispatch(setSelectedWatchlist(company));
          }
        });
      }
    }
  }, [dispatch, getQueryParams]);

  useEffect(() => {
    const selectedItemRecentId = get(selectedItem, 'recentId', null);
    if (selectedItem && selectedItemRecentId !== sentimentRecentId) {
      dispatch(getSentimentData());
      if (hideCards === 'true') {
        dispatch(getCompanyFilingGraphData());
      }
    }
  }, [dispatch, selectedItem, hideCards, sentimentRecentId]);

  const handleSelection = path => {
    setTimeout(() => {
      document.getElementById(path).scrollIntoView();
    }, 100);
  };

  const getCompanyByTicker = async ticker => {
    return new Promise(resolve => {
      setTimeout(() => {
        let rawData = localStorage.getItem(`watchlist-data-all`);
        if (rawData) {
          rawData = cjson.decompress.fromString(rawData);
        }
        let company = rawData.find(sd => sd.ticker === ticker);
        resolve(company);
      }, 100);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes.loaderSection}>
          <BeatLoader color={'var(--primary)'} size={15} />
        </div>
      ) : isPin ? (
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
