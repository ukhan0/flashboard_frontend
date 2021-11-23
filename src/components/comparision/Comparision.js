import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import config from '../../config/config';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ComparisionFilters from './ComparisionFilters';
import { getComparisionSettings, saveComparisionSettings } from './ComparisionHelper';
import { get } from 'lodash';
import cjson from 'compressed-json';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';

const Comparision = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);
  const [comparisionDifference, setComparisionDifference] = useState(
    get(getComparisionSettings(), 'comparisionDifference', 0)
  );

  const [comparisionMethod, setComparisionMethod] = useState(
    get(getComparisionSettings(), 'comparisionMethod', 'text')
  );
  const [comparisionSection, setComparisionSection] = useState(
    get(getComparisionSettings(), 'comparisionSection', 'totdoc')
  );
  const { selectedItem, selectedFileType } = props;

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
  let getQueryParams = new URLSearchParams(useLocation().search);
  if (!getQueryParams.get('recentId') && !selectedItem) {
    history.push('/watchlist');
  }
  useEffect(() => {
    if (!firstTimeLoad.current) {
      firstTimeLoad.current = true;
      if (getQueryParams.get('recentId')) {
        let ticker = getQueryParams.get('ticker');
        let selectedItem = getCompanyByTicker(ticker);
        let company = formatComapnyData(selectedItem);
        company.recentId = getQueryParams.get('recentId');
        dispatch(setSelectedWatchlist(company));
      }
    }
  }, [dispatch, getQueryParams]);
  useEffect(() => {
    const comparisonSetting = {
      comparisionSection: comparisionSection,
      comparisionDifference: comparisionDifference,
      comparisionMethod: comparisionMethod
    };

    saveComparisionSettings(comparisonSetting);
  }, [comparisionDifference, comparisionMethod, comparisionSection]);

  const getCompanyByTicker = ticker => {
    let rawData = localStorage.getItem(`watchlist-data-all`);
    if (rawData) {
      rawData = cjson.decompress.fromString(rawData);
    }
    let company = rawData.find(sd => sd.ticker === ticker);
    return company;
  };
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

  return (
    <>
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
            src={`${config.comparisionSite}?f1=${selectedItem.oldId}&f2=${selectedItem.recentId}&${metricQueryParam}&method=${comparisionMethod}&diff=${comparisionDifference}`}
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

const mapStateToProps = state => ({
  selectedItem: state.Watchlist.selectedItem,
  selectedMetric: state.Watchlist.selectedMetric,
  selectedFileType: state.Watchlist.selectedFileType
});

export default connect(mapStateToProps)(Comparision);
