import React from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Comparision = props => {
  const { selectedItem, selectedMetric } = props;
  let metricQueryParam = '';
  const history = useHistory();
  if (!selectedItem) {
    history.push('/watchlist');
  }
  switch (selectedMetric) {
    case 'mda':
      metricQueryParam = 'partHeadingTag=P2&itemHeadingTag=I7';
      break;
    case 'rf':
      metricQueryParam = 'partHeadingTag=P1&itemHeadingTag=I1A';
      break;
    case 'notes':
      metricQueryParam = 'partHeadingTag=N';
      break;
    case 'fss':
      metricQueryParam = 'partHeadingTag=P2&itemHeadingTag=I8';
      break;
    default:
      metricQueryParam = '';
      break;
  }

  return selectedItem ? (
    <iframe
      src={`${config.comparisionSite}?f1=${selectedItem.recentId}&f2=${selectedItem.oldId}&${metricQueryParam}`}
      title="Comparision"
      width="100%"
      height={`${window.innerHeight - 100}px`}
      samesite="None"
      frameBorder="0"
      id="comparisionResult"
    />
  ) : (
    <Typography variant="h3">No row selected</Typography>
  );
};

const mapStateToProps = state => ({
  selectedItem: state.Watchlist.selectedItem,
  selectedMetric: state.Watchlist.selectedMetric
});

export default connect(mapStateToProps)(Comparision);
