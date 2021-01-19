import React from 'react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import {
  setWatchlistFileType,
  setWatchlistUniverse,
  setWatchlistMetric
} from '../../reducers/Watchlist';
import { connect } from 'react-redux';

const fileTypesSelection = [
  { label: '10-k', key: '10k' },
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
    completeDataLoaded,
    recentDataLoaded
  } = props;

  const canItbeUsed = universeType => {
    let flag = false;
    if (universeType === 'recent' && !recentDataLoaded) {
      flag = true;
    } else if (universeType === 'all' && !completeDataLoaded) {
      flag = true;
    }
    return flag;
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}>
      <Grid item>
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">
          File Types
        </h6>
        <ButtonGroup color="primary">
          {fileTypesSelection.map((fileType, i) => (
            <Button
              key={`ft_${i}`}
              onClick={() => setWatchlistFileType(fileType.key)}
              variant={
                selectedFileType === fileType.key ? 'contained' : 'outlined'
              }>
              {fileType.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">
          Universe
        </h6>
        <ButtonGroup color="primary">
          {universeSelection.map((universe, i) => (
            <Button
              key={`uni_${i}`}
              onClick={() => setWatchlistUniverse(universe.key)}
              disabled={canItbeUsed(universe.key)}
              variant={
                selectedUniverse === universe.key ? 'contained' : 'outlined'
              }>
              {universe.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">
          Metrics
        </h6>
        <ButtonGroup color="primary">
          {metricsSelection.map((metric, i) => (
            <Button
              key={`met_${i}`}
              onClick={() => setWatchlistMetric(metric.key)}
              variant={
                selectedMetric === metric.key ? 'contained' : 'outlined'
              }>
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
  completeDataLoaded: state.Watchlist.completeDataLoaded,
  recentDataLoaded: state.Watchlist.recentDataLoaded
});

const mapDispatchToProps = dispatch => ({
  setWatchlistFileType: value => dispatch(setWatchlistFileType(value)),
  setWatchlistUniverse: value => dispatch(setWatchlistUniverse(value)),
  setWatchlistMetric: value => dispatch(setWatchlistMetric(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistFilters);
