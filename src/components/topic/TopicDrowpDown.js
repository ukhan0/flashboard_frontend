import React, { Fragment } from 'react';
import TopicSearchHistory from './TopicSearchHistory';
import { Grid, Menu, Button, ButtonGroup, List } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function TopicSavedSearchesDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item>
          <ButtonGroup variant="outlined" color="primary" aria-label="split button" onClick={handleClick}>
            <Button>My Topics</Button>
            <Button color="primary" size="small" aria-haspopup="true" onClick={handleClick}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}>
            <div className="overflow-hidden dropdown-menu-xl">
              <PerfectScrollbar className="scroll-area">
                <List className="nav-danger nav-pills flex-column p-3">
                  <TopicSearchHistory handleClose={handleClose} />
                </List>
              </PerfectScrollbar>
            </div>
          </Menu>
        </Grid>
      </Grid>
    </Fragment>
  );
}
