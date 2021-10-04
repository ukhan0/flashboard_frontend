import React from 'react';
import { ListItem, List, ListItemText, Switch, Grid, Typography } from '@material-ui/core';
import WatchlistService from '../WatchlistService';
import { useDispatch, useSelector } from 'react-redux';
import { setIsColorEnable } from '../../../reducers/Watchlist';
import { updateWatchlistEmailAlertStatus } from './WatchlistActionApiCalls';
import { getUser, setUser } from '../WatchlistHelpers';

export default function WatchListActions() {
  const dispatch = useDispatch();
  const { isColorEnable } = useSelector(state => state.Watchlist);

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
      updateUserLocalStorage(true);
    } else {
      updateUserLocalStorage(false);
      dispatch(setIsColorEnable(false));
    }
    dispatch(updateWatchlistEmailAlertStatus());
  };

  const updateUserLocalStorage = status => {
    const user = getUser();
    user.enable_watchlist_color = status;
    setUser(user);
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
    </List>
  );
}
