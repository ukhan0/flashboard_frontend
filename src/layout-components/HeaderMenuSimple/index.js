import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { setSidebarToggle } from '../../reducers/ThemeOptions';
import { useHistory } from 'react-router-dom';

const HeaderMenu = props => {
  const location = useLocation();
  const history = useHistory();
  const { setSidebarToggle } = props;

  const goToWatchlist = () => {
    setSidebarToggle(true);
    history.push('/watchlist');
  };

  const gotToTopic = () => {
    setSidebarToggle(true);
    history.push('/topic');
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
          Home
        </Button>
        <Button
          size="medium"
          color="inherit"
          onClick={gotToTopic}
          className={clsx(
            'btn-inverse font-size-xs mx-2',
            location.pathname === '/topic' ? 'btn-active' : ''
          )}>
          Topic
        </Button>
        <Button
          size="medium"
          color="inherit"
          disabled={true}
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
  setSidebarToggle: value => dispatch(setSidebarToggle(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
