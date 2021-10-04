import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData } from './sentimentActions';
import { useHistory } from 'react-router-dom';
import SentimentContentSection from './SentimentContentSection';
import SentimentTableOfContent from './SentimentTableOfContent';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
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
  let getQueryParams = new URLSearchParams(useLocation().search);
  if (!getQueryParams.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }
  useEffect(() => {
    if (!firstTimeLoad.current) {
      firstTimeLoad.current = true;
      if (
        getQueryParams.get('recentId') 
        // &&
        // getQueryParams.get('ticker') &&
        // getQueryParams.get('industry') &&
        // getQueryParams.get('sector')
      ) {
        const sentimentData = {};
        sentimentData.industry = getQueryParams.get('industry');
        sentimentData.sector = getQueryParams.get('sector');
        sentimentData.ticker = getQueryParams.get('ticker');
        sentimentData.recentId = getQueryParams.get('recentId');
        dispatch(setSelectedWatchlist(sentimentData));
      }
      dispatch(getSentimentData());
    }
  }, [dispatch, getQueryParams]);

  const handleSelection = path => {
    setTimeout(() => {
      document.getElementById(path).scrollIntoView();
    }, 100);
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
