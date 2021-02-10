import React from 'react';
import { Button } from '@material-ui/core';
import WatchListActionItems from './WatchlistActionItems';
import useStyles from './styles';
import WatchlistService from '../WatchlistService';

export default function WatchListActions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actionSelected = actionName => {
    setAnchorEl(null);
    if (actionName === 'autoSize') {
      WatchlistService.autoSizeColumns();
    } else if (actionName === 'sizeToFit') {
      WatchlistService.sizeColumnsToFit();
    } else if (actionName === 'csvExport') {
      WatchlistService.exportWatchlist('csv');
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" size="small" onClick={handleClick}>
        Actions
      </Button>
      <WatchListActionItems anchorEl={anchorEl} handleClose={handleClose} actionSelected={actionSelected} />
    </>
  );
}
