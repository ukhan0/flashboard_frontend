import React from 'react';
import { Grid, ButtonGroup, Button, Typography } from '@material-ui/core';
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
  { label: 'Complete', key: 'complete' }
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
    setWatchlistMetric
  } = props;

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
  selectedMetric: state.Watchlist.selectedMetric
});

const mapDispatchToProps = dispatch => ({
  setWatchlistFileType: enable => dispatch(setWatchlistFileType(enable)),
  setWatchlistUniverse: enable => dispatch(setWatchlistUniverse(enable)),
  setWatchlistMetric: enable => dispatch(setWatchlistMetric(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistFilters);
