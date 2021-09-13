import React from 'react';
import { ListItem, List, ListItemText, Switch, Grid, Typography } from '@material-ui/core';
import WatchlistService from '../WatchlistService';
import { useDispatch, useSelector } from 'react-redux';
import { setIsColorEnable, setIsWatchlistEmailAlertEnable } from '../../../reducers/Watchlist';
import { updateWatchlistEmailAlertStatus } from './WatchlistActionApiCalls';

export default function WatchListActions() {
  const dispatch = useDispatch();
  const { isColorEnable, isEmailAlertEnable } = useSelector(state => state.Watchlist);

  const actions = [
    { key: 'autoSize', label: 'Auto Size Columns' },
    // { key: 'sizeToFit', label: 'Fit Column Size' },
    { key: 'csvExport', label: 'CSV Export' }
  ];

  const handleClick = event => {
    actionSelected(event);
  };

  const actionSelected = actionName => {
    if (actionName === 'autoSize') {
      WatchlistService.autoSizeColumns();
    } else if (actionName === 'sizeToFit') {
      WatchlistService.sizeColumnsToFit();
    } else if (actionName === 'csvExport') {
      WatchlistService.exportWatchlist('csv');
    }
  };

  const handleChange = event => {
    if (event.target.checked) {
      dispatch(setIsColorEnable(true));
      updateUserLocalStorage(false, true);
    } else {
      updateUserLocalStorage(false, false);
      dispatch(setIsColorEnable(false));
    }
    dispatch(updateWatchlistEmailAlertStatus());
  };
  const handleChangeEmailAlert = event => {
    if (event.target.checked) {
      updateUserLocalStorage(true, true);
      dispatch(setIsWatchlistEmailAlertEnable(true));
    } else {
      updateUserLocalStorage(true, false);
      dispatch(setIsWatchlistEmailAlertEnable(false));
    }
    dispatch(updateWatchlistEmailAlertStatus());
  };

  const updateUserLocalStorage = (isAlert, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (isAlert) {
      user.send_watchlist_alert_email = status;
    } else {
      user.enable_watchlist_color = status;
    }
    localStorage.setItem('user', JSON.stringify(user));
  };
  return (
    <List component="nav">
      {actions.map((action, index) => {
        return (
          <ListItem
            key={index}
            button
            onClick={() => {
              handleClick(action.key);
            }}>
            <ListItemText primary={action.label} />
          </ListItem>
        );
      })}
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Switch
            checked={isColorEnable}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Grid>
        <Grid item>
          <Typography>Enable Colors</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Switch
            checked={isEmailAlertEnable}
            onChange={handleChangeEmailAlert}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Grid>
        <Grid item>
          <Typography>Enable Email Alert</Typography>
        </Grid>
      </Grid>
    </List>
  );
}
