import React, { useState, useEffect, useRef } from 'react';
import { Button, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SentimentCard from './SentimentCard';
import SentimentSection from './SentimentSection';
import SentimentDrawer from './SentimentDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData } from './sentimentActions';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  drawerOpener: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  goToTopContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    right: 20,
    bottom: 20,
  },
}));

const Sentiment = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch()
  const classes = useStyles()
  const contentTopRef = useRef(null)

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

  const handleSelection = (path) => {
    setIsDrawerOpen(false)
    setTimeout(() => {
      document.getElementById(path).scrollIntoView();
    }, 100)
  }

  return (
    <div ref={contentTopRef}>
      <SentimentCard />
      <div className={classes.drawerOpener}>
        <Button color="primary" onClick={toggleDrawer}>
          Table of contents
        </Button>
      </div>
      <SentimentSection />
      <SentimentDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} 
        onSelection={handleSelection}
      />
      <div className={classes.goToTopContainer}>
        <Fab onClick={() => contentTopRef.current.scrollIntoView()}>
          <UpIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Sentiment;
