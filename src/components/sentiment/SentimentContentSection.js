import React, { useRef, useState } from 'react';
import { Button, Fab, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SentimentSection from './SentimentSection';
import SentimentDrawer from './SentimentDrawer';
import { useSelector, useDispatch } from 'react-redux';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';
import SentimentCompanyDetails from './SentimentCompanyDetails';
import config from '../../config/config';
import { setSentimentDrawerOpen, setIsPin } from '../../reducers/Sentiment';
import { useLocation } from 'react-router-dom';
import SentimentCard from '../Filings/FillingsCardData';
import SentimentPdf from './SentimentPdf';

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
    position: 'sticky',
    zIndex: 100000
  }
}));

const SentimentContentSection = props => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { searchIndex, isFromThemex } = useSelector(state => state.Topic);
  const { isTocButton, currentToc, data } = useSelector(state => state.Sentiment);
  const [sentimentVesion, setSentimentVersion] = useState('flatText');
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentTopRef = useRef(null);
  let getQueryParams = new URLSearchParams(useLocation().search);
  let hideCards = config.hideCard;
  const history = useHistory();
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
    if (!getQueryParams.get('recentId')) {
      history.goBack();
    } else {
      history.push('/watchlist');
    }
  };
  const handleClickSentimentVersion = v => {
    setSentimentVersion(v);
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
      <div className={classes.companyDetail}>
        {selectedItem ? (
          <Box m={2}>
            <SentimentCompanyDetails
              handleClickSentimentVersion={handleClickSentimentVersion}
              sentimentVesion={sentimentVesion}
            />
          </Box>
        ) : null}
      </div>
      {hideCards === 'true' ? (
        searchIndex['value'] === 'filling_int_sentiment4' && isFromThemex ? null : (
          <SentimentCard />
        )
      ) : null}

      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>

      <div className={classes.drawerOpener}>
        {isTocButton && sentimentVesion === 'flatText' ? (
          <Button color="primary" variant="contained" className="m-2" onClick={toggleDrawer}>
            Table of contents
          </Button>
        ) : null}
      </div>
        <>
          <div style={{ display: `${sentimentVesion === 'original' ? 'block': 'none'}` }}>
            <SentimentPdf />
          </div>
          { sentimentVesion !== 'original' ? (
          <>
            <SentimentSection contentData={props.contentData} onHandleHighlights={props.onHandleHighlights} onSelection={handleSelection} />
            <SentimentDrawer highlightsData={props.highlightsData}  tableData={props.tableData} onSelection={handleSelection} />
          </>) : null}
        </>

      <div className={classes.goToTopContainer}>
        <Fab onClick={() => contentTopRef.current.scrollIntoView()}>
          <UpIcon />
        </Fab>
      </div>
    </div>
  );
};

export default SentimentContentSection;
