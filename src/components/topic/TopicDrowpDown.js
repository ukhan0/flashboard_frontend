import React, { Fragment } from 'react';
import TopicSearchHistory from './TopicSearchHistory';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from '@material-ui/core/List';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { preventParentClick } from './topicHelpers';
export default function TopicSavedSearchesDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = event => {
    preventParentClick(event);
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = event => {
    preventParentClick(event);
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item>
          <ButtonGroup variant="outlined" color="primary" aria-label="split button" onClick={openMenu}>
            <Button>My Themes</Button>
            <Button color="primary" size="small" aria-haspopup="true">
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
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
                  <TopicSearchHistory handleClose={closeMenu} />
                </List>
              </PerfectScrollbar>
            </div>
          </Menu>
        </Grid>
      </Grid>
    </Fragment>
  );
}
