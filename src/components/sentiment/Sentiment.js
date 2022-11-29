import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSentimentData } from './sentimentActions';
import { useHistory } from 'react-router-dom';
import SentimentContentSection from './SentimentContentSection';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { getCompanyFilingGraphData } from '../Filings/FillingAction';
import { get, cloneDeep, isEmpty } from 'lodash';
import config from '../../config/config';
import convert from 'xml-js';
import { createHash } from '../../utils/helpers';
import { setSentimentResult, setIsHighlightedText } from '../../reducers/Sentiment';
import { visitOutlineObjTable, visitOutlineObj, removeHeadingTags } from './SentimentHelpers';
import queryString from 'query-string';

const Sentiment = () => {
  const selectedItem = useSelector(state => state.Watchlist.selectedItem);
  const { completeCompaniesData, isCompleteCompaniesDataLoaded } = useSelector(state => state.Watchlist);
  const { data, sentimentRecentId } = useSelector(state => state.Sentiment);
  const [isComapnySedar, setIsCompanySedar] = useState(false);

  useEffect(() => {
    const documentType = get(selectedItem, 'documentType', '');
    const sourceName = get(selectedItem, 'source_name', '');
    if (sourceName.toUpperCase() === "EDGAR" || documentType === "10-K" || documentType === "10-Q") {
      setIsCompanySedar(false);
    } else {
      setIsCompanySedar(true);
    }
  }, [selectedItem]);

  const dispatch = useDispatch();
  const history = useHistory();
  const firstTimeLoad = useRef(false);
  const firstTimeLoadd = useRef(false);
  const firstTimeDataArray = useRef(false);
  const sentimentHighlightsData = useRef([]);
  const [tableData, setTableData] = useState([]);
  const [contentData, setContentData] = useState([]);
  let hideCards = config.hideCard;
  const queryParam = new URLSearchParams(useLocation().search);
  let getQueryParams = useRef(queryParam);

  if (!getQueryParams.current.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }

  useEffect(() => {
    return () => {
      dispatch(setSentimentResult(null, null));
    };
  }, [dispatch]);

  const getCompanyByTicker = useCallback(
    async ticker => {
      return new Promise(resolve => {
        setTimeout(() => {
          let company = completeCompaniesData.find(sd => sd.ticker === ticker);
          resolve(cloneDeep(company));
        }, 100);
      });
    },
    [completeCompaniesData]
  );
  useEffect(() => {
    firstTimeLoad.current = false;
    firstTimeLoadd.current = false;
  }, [history.location.search]);

  useEffect(() => {
    if (!firstTimeLoad.current) {
      dispatch(setIsHighlightedText(false));
      let data = queryString.parse(history.location.search);
      firstTimeLoad.current = true;
      if (data.recentId) {
        let ticker = data.ticker;
        if (completeCompaniesData && !isEmpty(completeCompaniesData)) {
          getCompanyByTicker(ticker).then(localSelectedItem => {
            if (localSelectedItem) {
              let company = formatComapnyData(localSelectedItem);
              company.recentId = data.recentId;
              dispatch(setSentimentResult(null, null));
              firstTimeLoadd.current = false;
              dispatch(setSelectedWatchlist(company));
            }
          });
        } else {
          let company = {};
          company.recentId = data.recentId;
          company.sector = data.sector;
          company.industry = data.industry;
          company.ticker = data.ticker;
          dispatch(setSentimentResult(null, null));
          firstTimeLoadd.current = false;
          dispatch(setSelectedWatchlist(company));
        }
      }
    }
  }, [dispatch, getCompanyByTicker, completeCompaniesData, isCompleteCompaniesDataLoaded, history.location.search]);

  useEffect(() => {
    if (!firstTimeLoadd.current) {
      dispatch(getSentimentData());
      if (hideCards === 'true') {
        dispatch(getCompanyFilingGraphData());
      }
      firstTimeLoadd.current = true;
    }
  }, [dispatch, selectedItem, hideCards, sentimentRecentId]);

  const handleHighlights = hightlightsArr => {
    if (!firstTimeDataArray.current) {
      firstTimeDataArray.current = true;
      sentimentHighlightsData.current = [];
      sentimentHighlightsData.current = hightlightsArr;
    }
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
      firstTimeDataArray.current = false;
    };
  }, [data]);

  return (
    <SentimentContentSection
      highlightsData={sentimentHighlightsData.current}
      contentData={contentData}
      tableData={tableData}
      onHandleHighlights={handleHighlights}
      isComapnySedar={isComapnySedar}
    />
  );
};

export default Sentiment;
