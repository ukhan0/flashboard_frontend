import React, { useRef } from 'react';
import { Button, Fab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SentimentCard from './SentimentCard';
import SentimentSection from './SentimentSection';
import SentimentDrawer from './SentimentDrawer';
import { useSelector, useDispatch } from 'react-redux';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';
import SentimentCompanyDetails from './SentimentCompanyDetails';
import config from '../../config/config';
import { setSentimentDrawerOpen, setIsPin } from '../../reducers/Sentiment';

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

const SentimentContentSection = props => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { isTocButton, currentToc, data } = useSelector(state => state.Sentiment);
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentTopRef = useRef(null);
  let hideCards = config.hideCard;
  const history = useHistory();
  if (!selectedItem) {
    history.push('/watchlist');
  }

  const toggleDrawer = () => {
    if (currentToc) {
      dispatch(setIsPin(true));
    } else {
      dispatch(setSentimentDrawerOpen(true));
    }
  };
  const handleSelection = path => {
    if (data) {
      setTimeout(() => {
        if (document.getElementById(path)) {
          document.getElementById(path).scrollIntoView();
        }
      }, 100);
    }
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
        {isTocButton ? (
          <Button color="primary" variant="contained" className="m-2" onClick={toggleDrawer}>
            Table of contents
          </Button>
        ) : null}
      </div>
      <SentimentSection onSelection={handleSelection} />
      <SentimentDrawer onSelection={handleSelection} />
      <div className={classes.goToTopContainer}>
        <Fab onClick={() => contentTopRef.current.scrollIntoView()}>
          <UpIcon />
        </Fab>
      </div>
    </div>
  );
};

export default SentimentContentSection;
