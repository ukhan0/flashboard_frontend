import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SentimentSection from './SentimentSection';
import GlobalSentimentSection from './GlobalSentimentSection';
import SentimentDrawer from './SentimentDrawer';
import { useSelector, useDispatch } from 'react-redux';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import SentimentCompanyDetails from './SentimentCompanyDetails';
import SentimentTableOfContent from './SentimentTableOfContent';
import config from '../../config/config';
import { setSentimentDrawerOpen, setIsPin, setSelectedHeadingId } from '../../reducers/Sentiment';
import SentimentCard from '../Filings/FillingsCardData';
import SentimentPdf from './SentimentPdf';
import { createHash } from '../../utils/helpers';

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
  },
  tableOfContent: {
    position: 'sticky',
    top: 60,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const SentimentContentSection = ({ contentData, onHandleHighlights, highlightsData, tableData, isComapnySedar }) => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { searchIndex, isFromThemex } = useSelector(state => state.Topic);
  const { isPin, currentToc, data } = useSelector(state => state.Sentiment);
  const [openPdfPopup, setOpenPdfPopup] = useState(false);

  const classes = useStyles();
  let is_first_iteration = useRef(0);
  const dispatch = useDispatch();
  const contentTopRef = useRef(null);
  let hideCards = config.hideCard;
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

  const handleClickSentimentVersion = v => {
    if (v === 'original') {
      setOpenPdfPopup(true);
    }
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

  return (
    <div ref={contentTopRef}>
      {openPdfPopup && <SentimentPdf closeOpenPdfPopup={() => setOpenPdfPopup(false)} />}
      {isPin ? (
        <>
          <Grid container spacing={0}>
            <Grid item xs={8}>
              <div className={classes.companyDetail}>
                {selectedItem && (
                  <Box m={2}>
                    <SentimentCompanyDetails
                      handleClickSentimentVersion={handleClickSentimentVersion}
                      highlightsData={highlightsData}
                      clickHandle={clickHandle}
                      newTest={newTest}
                      is_first_iteration={is_first_iteration}
                    />
                  </Box>
                )}
              </div>
              {hideCards === 'true' &&
                (searchIndex['value'] === 'filling_int_sentiment4' && isFromThemex ? null : <SentimentCard />)}

              {isComapnySedar ?
                <GlobalSentimentSection
                  contentData={contentData}
                  onHandleHighlights={onHandleHighlights}
                  onSelection={handleSelection}
                />
                :
                <SentimentSection
                  contentData={contentData}
                  onHandleHighlights={onHandleHighlights}
                  onSelection={handleSelection}
                />
              }
            </Grid>
            <Grid item xs={4}>
              <div className={classes.tableOfContent}>
                <SentimentTableOfContent
                  highlightsData={highlightsData}
                  tableData={tableData}
                  onSelection={handleSelection}
                  clickHandle={clickHandle}
                />
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div className={classes.companyDetail}>
            {selectedItem && (
              <Box m={2}>
                <SentimentCompanyDetails
                  handleClickSentimentVersion={handleClickSentimentVersion}
                  highlightsData={highlightsData}
                  clickHandle={clickHandle}
                  newTest={newTest}
                  is_first_iteration={is_first_iteration}
                />
              </Box>
            )}
          </div>
          {hideCards === 'true' &&
            (searchIndex['value'] === 'filling_int_sentiment4' && isFromThemex ? null : <SentimentCard />)}

          <div className={classes.drawerOpener}>
            <Button color="primary" variant="contained" className="m-2" onClick={toggleDrawer}>
              Table of contents
            </Button>
          </div>
          {isComapnySedar ?
            <GlobalSentimentSection
              contentData={contentData}
              onHandleHighlights={onHandleHighlights}
              onSelection={handleSelection}
            />
            :
            <SentimentSection
              contentData={contentData}
              onHandleHighlights={onHandleHighlights}
              onSelection={handleSelection}
            />
          }
          <SentimentDrawer
            highlightsData={highlightsData}
            tableData={tableData}
            onSelection={handleSelection}
            clickHandle={clickHandle}
          />
          <div className={classes.goToTopContainer}>
            <Fab onClick={() => contentTopRef.current.scrollIntoView()}>
              <UpIcon />
            </Fab>
          </div>
        </>
      )}
    </div>
  );
};

export default SentimentContentSection;
