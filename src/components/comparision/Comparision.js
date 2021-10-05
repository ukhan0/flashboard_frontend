import React from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import ComparisionCompanyDetail from './ComparisionCompanyDetails';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  companyDetail: {
    marginTop: '10px',
    marginLeft: '14px',
    marginRight: '14px'
  },
  backButton: {
    marginBottom: '15px',
    marginLeft: '5px'
  }
}));

const Comparision = props => {
  const classes = useStyles();
  const { selectedItem, selectedMetric, selectedFileType } = props;
  let metricQueryParam = '';
  const history = useHistory();
  if (!selectedItem) {
    history.push('/watchlist');
  }
  switch (selectedMetric) {
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

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Button
        className={classes.backButton}
        variant="contained"
        color="primary"
        onClick={() => {
          goBack();
        }}>
        Back
      </Button>
      <div className={classes.companyDetail}>
        <ComparisionCompanyDetail selectedItem={selectedItem} />
      </div>
      {selectedItem ? (
        <iframe
          src={`${config.comparisionSite}?f1=${selectedItem.oldId}&f2=${selectedItem.recentId}&${metricQueryParam}`}
          title="Comparision"
          width="100%"
          height={`${window.innerHeight - 370}px`}
          samesite="None"
          frameBorder="0"
          id="comparisionResult"
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
