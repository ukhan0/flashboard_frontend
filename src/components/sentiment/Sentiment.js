import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData } from './sentimentActions';
import { useHistory } from 'react-router-dom';
import SentimentContentSection from './SentimentContentSection';
import SentimentTableOfContent from './SentimentTableOfContent';

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
  if (!selectedItem) {
    history.push('/watchlist');
  }
  useEffect(() => {
    dispatch(getSentimentData());
  }, [dispatch]);

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
