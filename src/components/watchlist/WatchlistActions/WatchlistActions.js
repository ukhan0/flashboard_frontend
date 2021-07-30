import React from 'react';
import { ListItem, List, ListItemText, Switch, Grid } from '@material-ui/core';
import WatchlistService from '../WatchlistService';
import { useDispatch } from 'react-redux';
import { setIsColorEnable } from '../../../reducers/Watchlist';

export default function WatchListActions() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = React.useState(false);
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
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(setIsColorEnable(true));
    } else {
      dispatch(setIsColorEnable(false));
    }
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
            checked={isChecked}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Grid>
        <Grid item>
          <>color Enable</>
        </Grid>
      </Grid>
    </List>
  );
}
