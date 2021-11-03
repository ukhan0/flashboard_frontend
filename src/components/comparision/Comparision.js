import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import SideBarSetting from './ComparisionSideBar';
import { getComparisionSettings, saveComparisionSettings } from './ComparisionHelper';
import { get } from 'lodash';
import { BeatLoader } from 'react-spinners';
const Comparision = props => {
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
  if (!selectedItem) {
    history.push('/watchlist');
  }
  const handleComparisionMethod = method => {
    setComparisionMethod(method);
  };
  const handleComparisionDifference = diff => {
    setComparisionDifference(diff);
  };
  const handleComparisionSection = section => {
    setComparisionSection(section);
  };
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

  return (
    <>
      <SideBarSetting
        handleComparisionDifference={handleComparisionDifference}
        handleComparisionMethod={handleComparisionMethod}
        handleComparisionSection={handleComparisionSection}
        comparisionDifference={comparisionDifference}
        comparisionMethod={comparisionMethod}
        comparisionSection={comparisionSection}
      />
      {isLoading ? (
        <div style={{textAlign:'center'}}> <BeatLoader  color={'var(--primary)'} loading={true} size={10} /></div>
       
      ) : null}
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
    </>
  );
};

const mapStateToProps = state => ({
  selectedItem: state.Watchlist.selectedItem,
  selectedMetric: state.Watchlist.selectedMetric,
  selectedFileType: state.Watchlist.selectedFileType
});

export default connect(mapStateToProps)(Comparision);
