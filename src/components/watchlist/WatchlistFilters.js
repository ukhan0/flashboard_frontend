import React from 'react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import { setWatchlistFileType, setWatchlistUniverse, setWatchlistMetric } from '../../reducers/Watchlist';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

const fileTypesSelection = [
  { label: '10-K', key: '10k' },
  { label: '10-Q', key: '10q' }
];
const universeSelection = [
  { label: 'Watchlist', key: 'watchlist' },
  { label: 'Recent', key: 'recent' },
  { label: 'Complete', key: 'all' }
];
const metricsSelection = [
  { label: 'Total', key: 'totdoc' },
  { label: 'MD&A', key: 'mda' },
  { label: 'Risk', key: 'rf' },
  { label: 'Notes', key: 'notes' },
  { label: 'FSS', key: 'fss' }
];

const WatchlistFilters = props => {
  const {
    selectedFileType,
    selectedUniverse,
    selectedMetric,
    setWatchlistFileType,
    setWatchlistUniverse,
    setWatchlistMetric,
    completeDataLoaded
  } = props;

  const canItbeUsed = universeType => {
    let flag = false;
    if (universeType === 'all' && !completeDataLoaded) {
      flag = true;
    }
    return flag;
  };

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
      <Grid item>
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">File Types</h6>
        <ButtonGroup color="primary">
          {fileTypesSelection.map((fileType, i) => (
            <Button
              key={`ft_${i}`}
              onClick={() => setWatchlistFileType(fileType.key)}
              variant={selectedFileType === fileType.key ? 'contained' : 'outlined'}>
              {fileType.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">Universe</h6>
        <ButtonGroup color="primary">
          {universeSelection.map((universe, i) => (
            <Button
              key={`uni_${i}`}
              onClick={() => setWatchlistUniverse(universe.key)}
              disabled={canItbeUsed(universe.key)}
              variant={selectedUniverse === universe.key ? 'contained' : 'outlined'}>
              {universe.label}
              {canItbeUsed(universe.key) ? (
                <div style={{ marginLeft: 5 }}>
                  <ClipLoader color={'var(--warning)'} loading={true} size={10} />
                </div>
              ) : null}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">Metrics</h6>
        <ButtonGroup color="primary">
          {metricsSelection.map((metric, i) => (
            <Button
              key={`met_${i}`}
              onClick={() => setWatchlistMetric(metric.key)}
              variant={selectedMetric === metric.key ? 'contained' : 'outlined'}>
              {metric.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => ({
  selectedFileType: state.Watchlist.selectedFileType,
  selectedUniverse: state.Watchlist.selectedUniverse,
  selectedMetric: state.Watchlist.selectedMetric,
  completeDataLoaded: state.Watchlist.completeDataLoaded
});

const mapDispatchToProps = dispatch => ({
  setWatchlistFileType: value => dispatch(setWatchlistFileType(value)),
  setWatchlistUniverse: value => dispatch(setWatchlistUniverse(value)),
  setWatchlistMetric: value => dispatch(setWatchlistMetric(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistFilters);
