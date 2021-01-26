import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Hidden, IconButton, AppBar, Box, Tooltip } from '@material-ui/core';

import { connect } from 'react-redux';

import {
  setSidebarToggle,
  setSidebarToggleMobile
} from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/logos/sma-logo.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderMenuSimple from '../../layout-components/HeaderMenuSimple';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Header = props => {
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const {
    headerShadow,
    headerFixed,
    setSidebarToggle,
    sidebarToggle,
    showSidebar
  } = props;

  return (
    <Fragment>
      <AppBar
        color="secondary"
        className={clsx('app-header', {
          'app-header-collapsed-sidebar': props.isCollapsedLayout
        })}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box className="app-logo-wrapper" title="SMA">
              <Link to="/" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img className="app-logo-img" alt="SMA" src={projectLogo} />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">SMA</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center">
              {showSidebar && !props.isCollapsedLayout && (
                <Box
                  className={clsx('btn-toggle-collapse', {
                    'btn-toggle-collapse-closed': sidebarToggle
                  })}>
                  <Tooltip title="Toggle Sidebar" placement="right">
                    <IconButton
                      color="inherit"
                      onClick={toggleSidebar}
                      size="medium"
                      className="btn-inverse">
                      {sidebarToggle ? (
                        <MenuRoundedIcon />
                      ) : (
                        <MenuOpenRoundedIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <HeaderMenuSimple />
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
            <HeaderUserbox />
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  showSidebar: state.ThemeOptions.showSidebar
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggle: enable => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
