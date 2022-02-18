import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData } from './sentimentActions';
import { useHistory } from 'react-router-dom';
import SentimentContentSection from './SentimentContentSection';
import SentimentTableOfContent from './SentimentTableOfContent';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { getCompanyFilingGraphData } from '../Filings/FillingAction';
import { get, cloneDeep } from 'lodash';
import config from '../../config/config';
import convert from 'xml-js';
import { createHash } from '../../utils/helpers';
import { setSentimentResult } from '../../reducers/Sentiment';
import { visitOutlineObjTable, visitOutlineObj, removeHeadingTags } from './SentimentHelpers';

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
  const { selectedItem, completeCompaniesData, isCompleteCompaniesDataLoaded } = useSelector(state => state.Watchlist);
  const { isPin, data, sentimentRecentId } = useSelector(state => state.Sentiment);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const firstTimeLoad = useRef(false);
  const [tableData, setTableData] = useState([]);
  const [contentData, setContentData] = useState([]);
  let hideCards = config.hideCard;
  let getQueryParams = new URLSearchParams(useLocation().search);
  if (!getQueryParams.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }

  const getCompanyByTicker = useCallback(async ticker => {
    return new Promise(resolve => {
      setTimeout(() => {
        let company = completeCompaniesData.find(sd => sd.ticker === ticker);
        resolve(cloneDeep(company));
      }, 100);
    });
  },[completeCompaniesData]);

  useEffect(() => {
    if (!firstTimeLoad.current && isCompleteCompaniesDataLoaded) {
      firstTimeLoad.current = true;
      if (getQueryParams.get('recentId')) {
        let ticker = getQueryParams.get('ticker');
        if (completeCompaniesData) {
          getCompanyByTicker(ticker).then(localSelectedItem => {
            if (localSelectedItem) {
              let company = formatComapnyData(localSelectedItem);
              company.recentId = getQueryParams.get('recentId');
              dispatch(setSentimentResult(null, null));
              dispatch(setSelectedWatchlist(company));
            }
          });
        } else {
          let company = {};
          company.recentId = getQueryParams.get('recentId');
          company.sector = getQueryParams.get('sector');
          company.industry = getQueryParams.get('industry');
          company.ticker = getQueryParams.get('ticker');
          dispatch(setSentimentResult(null, null));
          dispatch(setSelectedWatchlist(company));
        }
      }
    }
  }, [dispatch, getQueryParams, getCompanyByTicker , completeCompaniesData, isCompleteCompaniesDataLoaded]);

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
      if (document.getElementById(path)) {
        document.getElementById(path).scrollIntoView();
      }
    }, 100);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const setTimeoutRef = setTimeout(() => {
      // create table of contents
      const tempTableData = [];
      const headings = get(data, 'sma_data_json', []);
      visitOutlineObjTable(tempTableData, headings, 0, '');

      setTableData(cloneDeep(tempTableData));

      // create display data
      const displayData = [];
      const content = get(data, 'sma_data_json', []);
      visitOutlineObj(displayData, content, 0, '');
      const newDisplayData = [];
      displayData.forEach(d => {
        const processedData = { ...d };
        processedData.id = createHash(d.path);
        if (d.content) {
          let newContent = removeHeadingTags(d.content);
          newContent = `<span>${newContent}</span>`;
          try {
            processedData.newData = convert.xml2js(newContent.replaceAll('&', ''));
          } catch (e) {
            processedData.newData = null;
          }
        }
        newDisplayData.push(processedData);
      });

      setContentData(cloneDeep(newDisplayData));
    }, 100);

    return () => {
      clearTimeout(setTimeoutRef);
    };
  }, [data]);

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
              <SentimentContentSection contentData={contentData} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.tableOfContent}>
              <SentimentTableOfContent tableData={tableData} onSelection={handleSelection} />
            </div>
          </Grid>
        </Grid>
      ) : (
        <SentimentContentSection contentData={contentData} tableData={tableData} />
      )}
    </>
  );
};

export default Sentiment;
