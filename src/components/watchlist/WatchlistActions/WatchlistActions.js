import React from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';
import WatchlistService from '../WatchlistService';

export default function WatchListActions() {
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
    </List>
  );
}
