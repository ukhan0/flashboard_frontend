import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../config/config';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ComparisionFilters from './ComparisionFilters';
import { getComparisionSettings, saveComparisionSettings, getOldId, getRecentId } from './ComparisionHelper';
import { get } from 'lodash';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSentimentResult } from '../../reducers/Sentiment';
import FilingsCompanyDetails from '../Filings/FilingsCompanyDetails';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  companyDetail: {
    top: 60,
    position: 'sticky',
    padding: 15,
    zIndex: 1
  }
}));
const Comparision = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsloading] = useState(true);
  const { selectedItem, selectedFileType, completeCompaniesData, isCompleteCompaniesDataLoaded } = useSelector(state => state.Watchlist);
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

  let metricQueryParam = '';
  const history = useHistory();

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
  const getQueryParams = useRef(new URLSearchParams(useLocation().search));
  if (!getQueryParams.current.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }

  const getCompanyByTicker = useCallback(ticker => {
    let rawData = completeCompaniesData;
    let company = rawData.find(sd => sd.ticker === ticker);
    return company;
  },[completeCompaniesData]);

  useEffect(() => {
    if(!isCompleteCompaniesDataLoaded){
        // show loader
    } else {
      // hide loader
    }
  }, [isCompleteCompaniesDataLoaded]);

  useEffect(() => {
    if (!firstTimeLoad.current && isCompleteCompaniesDataLoaded) {
      firstTimeLoad.current = true;
      if (getQueryParams.current.get('recentId')) {
        let ticker = getQueryParams.current.get('ticker');
        let selectedItem = getCompanyByTicker(ticker);
        let company = formatComapnyData(selectedItem);
        company.recentId = getQueryParams.current.get('recentId');
        company.oldId = getQueryParams.current.get('oldId');
        dispatch(setSentimentResult(null, null));
        dispatch(setSelectedWatchlist(company));
      }
    }
  }, [dispatch, getCompanyByTicker, isCompleteCompaniesDataLoaded]);

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
        selectedFileType === '10k' ? 'partHeadingTag=P2&itemHeadingTag=I7' : 'partHeadingTag=P1&itemHeadingTag=I2';
      break;
    case 'rf':
      metricQueryParam =
        selectedFileType === '10k' ? 'partHeadingTag=P1&itemHeadingTag=I1A' : 'partHeadingTag=P2&itemHeadingTag=I1A';
      break;
    case 'notes':
      metricQueryParam = 'partHeadingTag=N';
      break;
    case 'fss':
      metricQueryParam =
        selectedFileType === '10k' ? 'partHeadingTag=P2&itemHeadingTag=I8' : 'partHeadingTag=P1&itemHeadingTag=I1';
      break;
    default:
      metricQueryParam = '';
      break;
  }

  const oldId = getOldId(getQueryParams, selectedFileType, selectedItem);

  const recentId = getRecentId(getQueryParams, selectedFileType, selectedItem);

  getQueryParams.current.get('recentId')
    ? getQueryParams.current.get('recentId')
    : selectedFileType === '10k'
    ? get(selectedItem, 'recentId10k', null)
    : get(selectedItem, 'recentId10q', null);
  return (
    <>
      <div className={classes.companyDetail}>{sidebarToggle ? <FilingsCompanyDetails /> : null}</div>
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
        {selectedItem ? (
          <iframe
            src={`${config.comparisionSite}?f1=${oldId}&f2=${recentId}&${metricQueryParam}&method=${comparisionMethod}&diff=${comparisionDifference}`}
            title="Comparision"
            width="100%"
            height={`${window.innerHeight - 90}px`}
            samesite="None"
            frameBorder="0"
            id="comparisionResult"
            onLoad={() => {
              setIsloading(false);
            }}
          />
        ) : (
          <Typography variant="h3">No row selected</Typography>
        )}
      </div>
    </>
  );
};

export default Comparision;
