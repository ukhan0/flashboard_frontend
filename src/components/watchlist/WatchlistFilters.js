import React, { useEffect } from 'react';
import { Grid, ButtonGroup, Button, Switch, Typography } from '@material-ui/core';
import {
  setWatchlistUniverse,
  setWatchlistMetric,
  setIsNewWatchlistDataAvailable,
  setIsWatchlistEmailAlertEnable,
  setWatchlistType,
  setSelectedWatchlist,
  setWatchlistFileType
} from '../../reducers/Watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { universeSelection, metricsSelection, typesSelection } from '../../config/filterTypes';
import { updateWatchlistEmailAlertStatus } from './WatchlistActions/WatchlistActionApiCalls';
import { getUser, saveUser, saveWatchlistSettings } from './WatchlistHelpers';
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
    isEmailAlertEnable,
    selectedItem
  } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const isSection = (selectedType, metric, selectedFileType) => {
    let status = false;
    if (selectedFileType === '10q' || selectedFileType === '10k') {
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
    dispatch(setIsNewWatchlistDataAvailable(true));
    if (cancelExistingDocumentTypeCalls) {
      cancelExistingDocumentTypeCalls.cancel();
    }
  };

  // const handleClickFileType = key => {
  //   dispatch(setWatchlistFileType(key));
  //   dispatch(setIsNewWatchlistDataAvailable(true));
  //   if (cancelExistingDocumentTypeCalls) {
  //     cancelExistingDocumentTypeCalls.cancel();
  //   }
  // };

  const handleClickType = key => {
    if (key !== selectedType) {
      props.clearFilterHandler();
      dispatch(setSelectedWatchlist(null));
      if (selectedFileType !== '10k' && key === 'domestic') {
        dispatch(setWatchlistFileType('10k'));
      }

      dispatch(setWatchlistType(key));
      dispatch(setIsNewWatchlistDataAvailable(true));
      if (cancelExistingDocumentTypeCalls) {
        cancelExistingDocumentTypeCalls.cancel();
      }
    }
  };

  const handleChangeEmailAlert = event => {
    if (event.target.checked) {
      updateUserLocalStorage(true);
      dispatch(setIsWatchlistEmailAlertEnable(true));
    } else {
      updateUserLocalStorage(false);
      dispatch(setIsWatchlistEmailAlertEnable(false));
    }
    dispatch(updateWatchlistEmailAlertStatus());
  };

  const handleClickWatchlistMetric = metric => {
    dispatch(setWatchlistMetric(metric));
    if (selectedItem) {
      let comparisionSection = getComparisionSettings() ? getComparisionSettings() : {};
      comparisionSection.comparisionSection = metric;
      saveComparisionSettings(comparisionSection);
    }
  };

  const updateUserLocalStorage = status => {
    const user = getUser();
    user.send_watchlist_alert_email = status;
    saveUser(user);
  };

  const getSelectedFileType = (selectedType, selectedFileType) => {
    return selectedType === 'global' ? '10k' : selectedFileType;
  };

  useEffect(() => {
    const setting = {
      selectedFileType: getSelectedFileType(selectedType, selectedFileType),
      selectedType: selectedType,
      selectedUniverse: selectedUniverse,
      selectedMetric: selectedMetric
    };
    saveWatchlistSettings(setting);
  }, [selectedMetric, selectedUniverse, selectedFileType, selectedType]);

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item>
        <div className="text-black-50 opacity-6">Type</div>
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
        {/* <ButtonGroup color="primary">
          {(isGlobalSelected ? fileTypesSelectionGlobal : fileTypesSelection).map((fileType, i) => (
            <Button
              disabled={isGlobalSelected && fileType.key !== '10k' ? true : false}
              size="small"
              key={`ft_${i}`}
              onClick={() => handleClickFileType(fileType.key)}
              variant={selectedFileType === fileType.key ? 'contained' : 'outlined'}>
              {fileType.label}
            </Button>
          ))}
        </ButtonGroup> */}
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
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography style={{ paddingTop: '20px' }} color="primary">
              Enable Email Alert
            </Typography>
          </Grid>
          <Grid item>
            <div style={{ paddingTop: '20px' }}>
              <Switch
                checked={isEmailAlertEnable}
                onChange={handleChangeEmailAlert}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WatchlistFilters;
