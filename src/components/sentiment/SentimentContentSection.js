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
import { setSentimentDrawerOpen, setIsPin, setSelectedHeadingId } from '../../reducers/Sentiment';
import { useLocation } from 'react-router-dom';
import SentimentCard from '../Filings/FillingsCardData';
import SentimentPdf from './SentimentPdf';
import { createHash } from '../../utils/helpers';
import SentimentHtmlFile from './SentimentHtmlFile';
const useStyles = makeStyles(theme => ({
  drawerOpener: {
    display: 'flex',
    justifyContent: 'flex-end',
    top: 200,
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
  const { selectedItem, selectedType } = useSelector(state => state.Watchlist);
  const { searchIndex, isFromThemex } = useSelector(state => state.Topic);
  const { isTocButton, currentToc, data } = useSelector(state => state.Sentiment);
  const [sentimentVesion, setSentimentVersion] = useState(
    isFromThemex ? 'flatText' : selectedType === 'global' ? 'original' : 'flatText'
  );
  const classes = useStyles();
  let is_first_iteration = useRef(0);
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
  const clickHandle = (path, is_highlight = false) => {
    if (!is_highlight) {
      is_first_iteration.current = 0;
      path = createHash(path);
    }
    handleSelection(path);
    dispatch(setSelectedHeadingId(path));
  };
  const newTest = v => {
    is_first_iteration.current = v;
  };
  const isSentimentHtmlFile = sentimentVesion === 'flatText' && selectedType === 'global' ? true : false;
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
              onSelection={handleSelection}
              highlightsData={props.highlightsData}
              clickHandle={clickHandle}
              newTest={newTest}
              is_first_iteration={is_first_iteration}
              sentimentV={sentimentVesion}
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

      <div className={classes.drawerOpener} style={{ display: `${isSentimentHtmlFile ? 'none' : ''}` }}>
        {isTocButton && sentimentVesion === 'flatText' ? (
          <Button color="primary" variant="contained" className="m-2" onClick={toggleDrawer}>
            Table of contents
          </Button>
        ) : null}
      </div>
      <>
        <div style={{ display: `${sentimentVesion === 'original' ? 'block' : 'none'}` }}>
          <SentimentPdf />
        </div>
        {isSentimentHtmlFile ? (
          <>
            <SentimentHtmlFile disable={isSentimentHtmlFile} />
          </>
        ) : (
          <>
            {sentimentVesion === 'original' ? null : (
              <>
                <SentimentSection
                  contentData={props.contentData}
                  onHandleHighlights={props.onHandleHighlights}
                  onSelection={handleSelection}
                />
                <SentimentDrawer
                  highlightsData={props.highlightsData}
                  tableData={props.tableData}
                  onSelection={handleSelection}
                  clickHandle={clickHandle}
                />
              </>
            )}
          </>
        )}
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
