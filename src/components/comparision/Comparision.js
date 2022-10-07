import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../config/config';
import { useHistory } from 'react-router-dom';
import ComparisionFilters from './ComparisionFilters';
import { getComparisionSettings, saveComparisionSettings, getOldId, getRecentId } from './ComparisionHelper';
import { get } from 'lodash';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSentimentResult } from '../../reducers/Sentiment';
import FilingsCompanyDetails from '../Filings/FilingsCompanyDetails';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
  companyDetail: {
    top: 60,
    position: 'sticky',
    padding: '0 15px',
    zIndex: 1
  }
}));
const Comparision = props => {
  const iframeRef = useRef(null);
  const { innerHeight } = window;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsloading] = useState(true);
  const [height, setHeight] = useState(innerHeight);
  const [yHeight, setYHeight] = useState(0);
  const {
    selectedItem,
    selectedFileType,
    completeCompaniesData,
    completeCompaniesDataGlobal,
    isCompleteCompaniesDataLoaded
  } = useSelector(state => state.Watchlist);
  const { sidebarToggle } = useSelector(state => state.ThemeOptions);
  const [comparisionDifference, setComparisionDifference] = useState(
    get(getComparisionSettings(), 'comparisionDifference', 0)
  );

  const [comparisionMethod, setComparisionMethod] = useState(
    get(getComparisionSettings(), 'comparisionMethod', 'text')
  );
  const [comparisionSection, setComparisionSection] = useState(
    get(getComparisionSettings(), 'comparisionSection', 'totdoc')
  );
  const history = useHistory();
  let queryParamsData = queryString.parse(history.location.search);
  let metricQueryParam = '';

  const handleComparisionMethod = method => {
    setComparisionMethod(method);
    setIsloading(true);
  };
  const handleComparisionDifference = diff => {
    setComparisionDifference(diff);
    setIsloading(true);
  };
  const handleComparisionSection = section => {
    setComparisionSection(section);
    setIsloading(true);
  };
  const firstTimeLoad = useRef(false);
  let data = new URLSearchParams(useLocation().search);
  let getQueryParams = useRef(data);
  if (!getQueryParams.current.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }

  useEffect(() => {
    firstTimeLoad.current = false;
  }, [history.location.search]);

  useEffect(() => {
    setIsloading(true);
    if (!firstTimeLoad.current && isCompleteCompaniesDataLoaded) {
      firstTimeLoad.current = true;
      setTimeout(() => {
        let data = queryString.parse(history.location.search);
        if (data.recentId) {
          let company = async () =>
            await getCompanyByIndex(data.ticker, completeCompaniesData, completeCompaniesDataGlobal);
          if (company) {
            company.recentId = data.recentId;
            company.oldId = data.oldId;
            dispatch(setSentimentResult(null, null));
            dispatch(setSelectedWatchlist(company));
          }
        }
      }, [400]);
    }
  }, [
    dispatch,
    history.location.search,
    isCompleteCompaniesDataLoaded,
    completeCompaniesData,
    completeCompaniesDataGlobal
  ]);

  useEffect(() => {
    const comparisonSetting = {
      comparisionSection: comparisionSection,
      comparisionDifference: comparisionDifference,
      comparisionMethod: comparisionMethod
    };

    saveComparisionSettings(comparisonSetting);
  }, [comparisionDifference, comparisionMethod, comparisionSection]);
  switch (comparisionSection) {
    case 'mda':
      metricQueryParam =
        selectedFileType === '10-K' ? 'partHeadingTag=P2&itemHeadingTag=I7' : 'partHeadingTag=P1&itemHeadingTag=I2';
      break;
    case 'rf':
      metricQueryParam =
        selectedFileType === '10-k' ? 'partHeadingTag=P1&itemHeadingTag=I1A' : 'partHeadingTag=P2&itemHeadingTag=I1A';
      break;
    case 'notes':
      metricQueryParam = 'partHeadingTag=N';
      break;
    case 'fss':
      metricQueryParam =
        selectedFileType === '10-K' ? 'partHeadingTag=P2&itemHeadingTag=I8' : 'partHeadingTag=P1&itemHeadingTag=I1';
      break;
    default:
      metricQueryParam = '';
      break;
  }

  const oldId = getOldId(queryParamsData, selectedFileType, selectedItem);
  const recentId = getRecentId(queryParamsData, selectedFileType, selectedItem);
  const setFileType = useCallback(() => {
    let id = queryParamsData.recentId
      ? queryParamsData.recentId
      : selectedFileType === '10-K'
      ? get(selectedItem, 'recentId10k', null)
      : get(selectedItem, 'recentId10q', null);
    return id;
  }, [queryParamsData, selectedItem, selectedFileType]);

  useEffect(() => {
    setFileType();
  }, [setFileType]);

  useEffect(() => {
    const handleScroll = event => {
      const currentYheight = window.scrollY;
      if (currentYheight > yHeight) {
        setYHeight(currentYheight);
        setHeight(window.scrollY + innerHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [innerHeight, yHeight]);

  return (
    <>
      {sidebarToggle && (
        <div className={classes.companyDetail}>
          <FilingsCompanyDetails />
        </div>
      )}
      <ComparisionFilters
        handleComparisionDifference={handleComparisionDifference}
        handleComparisionMethod={handleComparisionMethod}
        handleComparisionSection={handleComparisionSection}
        comparisionDifference={comparisionDifference}
        comparisionMethod={comparisionMethod}
        comparisionSection={comparisionSection}
      />
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          {' '}
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}
      <div style={{ marginTop: '10px' }}>
        {
          <iframe
            ref={iframeRef}
            src={`${config.comparisionSite}?f1=${oldId}&f2=${recentId}&${metricQueryParam}&method=${comparisionMethod}&diff=${comparisionDifference}`}
            title="Comparision"
            width="100%"
            height={`${height}px`}
            samesite="None"
            frameBorder="0"
            id="comparisionResult"
            scrolling="no"
            onLoad={() => {
              setIsloading(false);
            }}
          />
        }
      </div>
    </>
  );
};

export default Comparision;
