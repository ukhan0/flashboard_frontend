import React, { Fragment } from 'react';
import { Button, Popover } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { setSidebarToggle } from '../../reducers/ThemeOptions';
import { useHistory } from 'react-router-dom';
import Help from '../../components/navigationBar/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import HomePageSearch from '../../components/homePage/HomePageSearch';
import { resetAllSearchParams } from '../../reducers/Topic';
import { hoverTime } from '../../config/appConfig';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  }
}));
const HeaderMenu = props => {
  const location = useLocation();
  const history = useHistory();
  const { setSidebarToggle } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorHelp, setAnchorHelp] = React.useState(null);
  const dispatch = useDispatch();
  const hoverTimer = React.useRef(null);

  const handleMouseEnter = event => {
    const { currentTarget } = event;
    let pathname = window.location.pathname;
    if (pathname !== '/topic') {
      currentTarget.style.cursor = 'wait';
      hoverTimer.current = setTimeout(() => {
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
    setAnchorHelp(anchorEl ? null : event.currentTarget);
  };

  const goToDashboard = () => {
    setSidebarToggle(true);
    history.push('/home');
  };

  const goToWatchlist = () => {
    setSidebarToggle(true);
    history.push('/watchlist');
  };

  const gotToTopic = e => {
    e.currentTarget.style.cursor = 'pointer';
    setSidebarToggle(true);
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
      <div className="app-header-menu" style={{display:"flex"}}>
        <Button
          size="medium"
          color="inherit"
          onClick={goToDashboard}
          className={clsx('btn-inverse font-size-xs mx-2', location.pathname === '/home' ? 'btn-active' : '')}>
          Home
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
        <Popover
          id={helpId}
          open={openHelp}
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
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarToggle: state.Watchlist.sidebarToggle
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggle: value => dispatch(setSidebarToggle(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
