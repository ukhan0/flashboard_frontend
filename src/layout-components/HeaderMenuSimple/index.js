import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { setSidebarDisplay } from '../../reducers/ThemeOptions';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';

const HeaderMenu = props => {
  const location = useLocation();
  const history = useHistory();
  const { setSelectedWatchlist, setSidebarDisplay } = props;

  const goToWatchlist = () => {
    setSidebarDisplay(false);
    setSelectedWatchlist(null);
    history.push('/watchlist');
  };

  return (
    <Fragment>
      <div className="app-header-menu">
        <Button
          size="medium"
          color="inherit"
          onClick={goToWatchlist}
          className={clsx(
            'btn-inverse font-size-xs mx-2',
            location.pathname === '/watchlist' ? 'btn-active' : ''
          )}>
          Watchlist
        </Button>
        <Button
          size="medium"
          color="inherit"
          className={clsx(
            'btn-inverse font-size-xs mx-2',
            location.pathname === '/topic' ? 'btn-active' : ''
          )}>
          Topic
        </Button>
        <Button
          size="medium"
          color="inherit"
          className={clsx(
            'btn-inverse font-size-xs mx-2',
            location.pathname === '/alerts' ? 'btn-active' : ''
          )}>
          Alerts
        </Button>
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
  setSidebarDisplay: value => dispatch(setSidebarDisplay(value)),
  setSelectedWatchlist: value => dispatch(setSelectedWatchlist(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
