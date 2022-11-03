import React, { Fragment, useState, useRef } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { setSidebarToggle } from '../../reducers/ThemeOptions';
import { useHistory } from 'react-router-dom';
import Help from '../../components/navigationBar/Navigation';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HomePageSearch from '../../components/homePage/HomePageSearch';
import { resetAllSearchParams } from '../../reducers/Topic';
import { hoverTime } from '../../config/appConfig';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  }
}));
const HeaderMenu = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorHelp, setAnchorHelp] = useState(null);
  const dispatch = useDispatch();
  const hoverTimer = useRef(null);

  const handleMouseEnter = event => {
    const { currentTarget } = event;
    let pathname = window.location.pathname;
    if (pathname !== '/topic') {
      currentTarget.style.cursor = 'wait';
      hoverTimer.current = setTimeout(() => {
        setAnchorHelp(null);
        dispatch(resetAllSearchParams());
        setAnchorEl(anchorEl ? null : currentTarget);
        currentTarget.style.cursor = 'pointer';
      }, hoverTime);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
  };
  const handleClickHelp = event => {
    setAnchorHelp(anchorHelp ? null : event.currentTarget);
    setAnchorEl(null);
  };

  const goToDashboard = () => {
    dispatch(setSidebarToggle(true));
    history.push('/home');
  };

  const goToWatchlist = () => {
    dispatch(setSidebarToggle(true));
    history.push('/watchlist');
  };

  const gotToTopic = e => {
    e.currentTarget.style.cursor = 'pointer';
    dispatch(setSidebarToggle(true));
    history.push('/topic');
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleCloseHelp = () => {
    setAnchorHelp(null);
  };

  const open = Boolean(anchorEl);
  const openHelp = Boolean(anchorHelp);
  const id = open ? 'simple-popper' : undefined;
  const helpId = openHelp ? 'simple-popper' : undefined;
  return (
    <Fragment>
      <div className="app-header-menu" style={{ display: 'flex' }}>
        <Button
          size="medium"
          color="inherit"
          onClick={goToDashboard}
          className={clsx('btn-inverse font-size-xs mx-2', location.pathname === '/home' ? 'btn-active' : '')}>
          Dashboard
        </Button>
        <Button
          size="medium"
          color="inherit"
          onClick={goToWatchlist}
          className={clsx('btn-inverse font-size-xs mx-2', location.pathname === '/watchlist' ? 'btn-active' : '')}>
          Grid
        </Button>
        <>
          <Button
            size="medium"
            color="inherit"
            onClick={gotToTopic}
            disabled={false}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={clsx('btn-inverse font-size-xs mx-2', location.pathname === '/topic' ? 'btn-active' : '')}>
            ThemeX
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose2}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            PaperProps={{
              style: { width: '400px' }
            }}>
            <div className={classes.paper}>
              <HomePageSearch onClose={handleClose2} />
            </div>
          </Popover>
        </>
        <Button
          size="medium"
          color="inherit"
          disabled={false}
          onClick={handleClickHelp}
          className={clsx('btn-inverse font-size-xs mx-2', location.pathname === '/guideline' ? 'btn-active' : '')}>
          Help
        </Button>
        {openHelp ?
          <Popover
            id={helpId}
            open={true}
            anchorEl={anchorHelp}
            onClose={handleCloseHelp}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            PaperProps={{
              style: { width: 'auto' }
            }}>
            <div className={classes.paper}>
              <Help onClose={handleCloseHelp} />
            </div>
          </Popover>
          : null
        }
      </div>
    </Fragment>
  );
};

export default HeaderMenu;
