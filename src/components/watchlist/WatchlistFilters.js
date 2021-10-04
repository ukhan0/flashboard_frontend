import React from 'react';
import { Grid, ButtonGroup, Button, Switch, Typography } from '@material-ui/core';
import {
  setWatchlistFileType,
  setWatchlistUniverse,
  setWatchlistMetric,
  setIsNewWatchlistDataAvailable,
  setIsWatchlistEmailAlertEnable
} from '../../reducers/Watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { fileTypesSelection, universeSelection, metricsSelection } from '../../config/filterTypes';
import { updateWatchlistEmailAlertStatus } from './WatchlistActions/WatchlistActionApiCalls';
import { getUser, setUser } from './WatchlistHelpers';

const WatchlistFilters = props => {
  const {
    selectedFileType,
    selectedUniverse,
    selectedMetric,
    completeDataLoaded,
    cancelExistingDocumentTypeCalls,
    isEmailAlertEnable
  } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();

  const canItbeUsed = universeType => {
    let flag = false;
    if (universeType === 'all' && !completeDataLoaded) {
      flag = true;
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

  const handleClickFileType = key => {
    dispatch(setWatchlistFileType(key));
    dispatch(setIsNewWatchlistDataAvailable(true));
    if (cancelExistingDocumentTypeCalls) {
      cancelExistingDocumentTypeCalls.cancel();
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

  const updateUserLocalStorage = status => {
    const user = getUser();
    user.send_watchlist_alert_email = status;
    setUser(user);
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
              onClick={() => handleClickFileType(fileType.key)}
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
              size="small"
              key={`met_${i}`}
              onClick={() => dispatch(setWatchlistMetric(metric.key))}
              variant={selectedMetric === metric.key ? 'contained' : 'outlined'}>
              {metric.label}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography style={{ paddingTop: '20px' }} className="text-black-50 opacity-6">
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
