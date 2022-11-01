import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {
  setWatchlistUniverse,
  setWatchlistMetric,
  setWatchlistType,
  setSelectedWatchlist,
  setWatchlistFileType
} from '../../reducers/Watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { universeSelection, metricsSelection, typesSelection } from '../../config/filterTypes';
import { saveWatchlistSettings } from './WatchlistHelpers';
import { saveComparisionSettings, getComparisionSettings } from '../comparision/ComparisionHelper';
import WatchlistFileTypeDropDown from './WatchlistFileTypeDropDown';

const WatchlistFilters = props => {
  const {
    selectedFileType,
    selectedType,
    selectedUniverse,
    selectedMetric,
    isCompleteCompaniesDataLoaded,
    isCompleteCompaniesDataGlobalLoaded,
    cancelExistingDocumentTypeCalls,
    selectedItem
  } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const isSection = (selectedType, metric, selectedFileType) => {
    let status = false;
    if (selectedFileType === '10-Q' || selectedFileType === '10-K') {
      status = selectedType === 'global' && metric.key !== 'totdoc' ? true : false;
    } else {
      status = true;
    }
    return status;
  };

  const canItbeUsed = universeType => {
    let flag = false;
    if (universeType === 'all') {
      if (selectedType === 'domestic' && !isCompleteCompaniesDataLoaded) {
        flag = true;
      } else if (selectedType === 'global' && !isCompleteCompaniesDataGlobalLoaded) {
        flag = true;
      }
    }
    return flag;
  };

  const handleClickUniverse = key => {
    dispatch(setWatchlistUniverse(key));
    if (cancelExistingDocumentTypeCalls) {
      cancelExistingDocumentTypeCalls.cancel();
    }
  };

  const handleClickType = key => {
    if (key !== selectedType) {
      props.clearFilterHandler();
      dispatch(setSelectedWatchlist(null));

      // if (selectedFileType !== '10-K' && key === 'domestic') {
      //   dispatch(setWatchlistFileType('10-K'));
      // }
      // if (key === 'global') {
      //   dispatch(setWatchlistFileType('10-K'));
      // }
      dispatch(setWatchlistFileType('10-K'));
      dispatch(setWatchlistType(key));
      if (cancelExistingDocumentTypeCalls) {
        cancelExistingDocumentTypeCalls.cancel();
      }
    }
  };

  const handleClickWatchlistMetric = metric => {
    dispatch(setWatchlistMetric(metric));
    if (selectedItem) {
      let comparisionSection = getComparisionSettings() ? getComparisionSettings() : {};
      comparisionSection.comparisionSection = metric;
      saveComparisionSettings(comparisionSection);
    }
  };

  useEffect(() => {
    const setting = {
      selectedFileType: selectedFileType,
      selectedType: selectedType,
      selectedUniverse: selectedUniverse,
      selectedMetric: selectedMetric
    };
    saveWatchlistSettings(setting);
  }, [selectedMetric, selectedUniverse, selectedFileType, selectedType]);

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item>
        <div className="text-black-50 opacity-6">Regions</div>
        <ButtonGroup color="primary">
          {typesSelection.map((type, i) => (
            <Button
              size="small"
              key={`t_${i}`}
              onClick={() => handleClickType(type.key)}
              variant={selectedType === type.key ? 'contained' : 'outlined'}>
              {type.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <div className="text-black-50 opacity-6">File Type</div>
        <WatchlistFileTypeDropDown />
      </Grid>
      <Grid item>
        <div className="text-black-50 opacity-6">Universe</div>
        <ButtonGroup color="primary">
          {universeSelection.map((universe, i) => (
            <Button
              size="small"
              key={`uni_${i}`}
              onClick={() => handleClickUniverse(universe.key)}
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
              disabled={isSection(selectedType, metric, selectedFileType)}
              size="small"
              key={`met_${i}`}
              onClick={() => handleClickWatchlistMetric(metric.key)}
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
