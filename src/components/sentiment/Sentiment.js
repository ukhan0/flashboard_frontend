import React, { useState, useEffect, useRef } from 'react';
import { Button, Fab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SentimentCard from './SentimentCard';
import SentimentSection from './SentimentSection';
import SentimentDrawer from './SentimentDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData } from './sentimentActions';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';
import SentimentCompanyDetails from './SentimentCompanyDetails';
import config from '../../config/config';

const useStyles = makeStyles(theme => ({
  drawerOpener: {
    display: 'flex',
    justifyContent: 'flex-end',
    top: 170,
    position: 'sticky'
  },
  goToTopContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    right: 20,
    bottom: 20
  },
  companyDetail: {
    top: 50,
    position: 'sticky'
  }
}));

const Sentiment = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const classes = useStyles();
  const contentTopRef = useRef(null);
  let hideCards = config.hideCard;
  const history = useHistory();
  if (!selectedItem) {
    history.push('/watchlist');
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    dispatch(getSentimentData());
  }, [dispatch]);

  const handleSelection = path => {
    setTimeout(() => {
      document.getElementById(path).scrollIntoView();
    }, 100);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div ref={contentTopRef}>
      <Button
        color="primary"
        className="m-2"
        variant="contained"
        onClick={() => {
          goBack();
        }}>
        Back
      </Button>
      {hideCards === 'true' ? <SentimentCard /> : null}
      <div className={classes.companyDetail}>
        {selectedItem ? (
          <Box m={2}>
            <SentimentCompanyDetails />
          </Box>
        ) : null}
      </div>
      <div className={classes.drawerOpener}>
        <Button color="primary" variant="contained" className="m-2" onClick={toggleDrawer}>
          Table of contents
        </Button>
      </div>
      
      <SentimentSection />
      <SentimentDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSelection={handleSelection} />
      <div className={classes.goToTopContainer}>
        <Fab onClick={() => contentTopRef.current.scrollIntoView()}>
          <UpIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Sentiment;
