import React from 'react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import { setWatchlistFileType, setWatchlistUniverse, setWatchlistMetric } from '../../reducers/Watchlist';
import { useDispatch, useSelector } from 'react-redux';
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
  { label: 'Notes', key: 'notes' }
  // { label: 'FSS', key: 'fss' }
];

const WatchlistFilters = props => {
  const { selectedFileType, selectedUniverse, selectedMetric, completeDataLoaded } = useSelector(
    state => state.Watchlist
  );
  const dispatch = useDispatch();

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
        <div className="text-black-50 opacity-6">File Type</div>
        <ButtonGroup color="primary">
          {fileTypesSelection.map((fileType, i) => (
            <Button
              size="small"
              key={`ft_${i}`}
              onClick={() => dispatch(setWatchlistFileType(fileType.key))}
              variant={selectedFileType === fileType.key ? 'contained' : 'outlined'}>
              {fileType.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <div className="text-black-50 opacity-6">Universe</div>
        <ButtonGroup color="primary">
          {universeSelection.map((universe, i) => (
            <Button
              size="small"
              key={`uni_${i}`}
              onClick={() => dispatch(setWatchlistUniverse(universe.key))}
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
        <div className="text-black-50 opacity-6">Section</div>
        <ButtonGroup color="primary">
          {metricsSelection.map((metric, i) => (
            <Button
              size="small"
              key={`met_${i}`}
              onClick={() => dispatch(setWatchlistMetric(metric.key))}
              variant={selectedMetric === metric.key ? 'contained' : 'outlined'}>
              {metric.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default WatchlistFilters;
