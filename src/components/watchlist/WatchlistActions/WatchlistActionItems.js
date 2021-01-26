import React from 'react';
import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    autoFocus={false}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function WatchListActionItems(props) {
  const { handleClose, anchorEl, actionSelected } = props;
  return (
    <StyledMenu
      id="customized-export-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <StyledMenuItem onClick={() => actionSelected('addTopic')}>
        <ListItemText id={'topic'} primary="Add To Watchlist" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => actionSelected('autoSize')}>
        <ListItemText id={'autoSize'} primary="Auto Size" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => actionSelected('sizeToFit')}>
        <ListItemText id={'sizeToFit'} primary="Size To Fit" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => actionSelected('clearFilter')}>
        <ListItemText id={'clearFilter'} primary="Clear Filter" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => actionSelected('clearSort')}>
        <ListItemText id={'sort'} primary="Clear Sort" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => actionSelected('csvExport')}>
        <ListItemText id={'csvExport'} primary="Export (.csv)" />
      </StyledMenuItem>
    </StyledMenu>
  );
}
