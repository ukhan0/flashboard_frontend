import React, { Fragment, useState } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Hidden, IconButton, AppBar, Box, Tooltip } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/logos/sma-logo-white.svg';
import Notification from '../../components/notification/Notification';
import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderMenuSimple from '../../layout-components/HeaderMenuSimple';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import GlobalTickerSearchField from '../../components/watchlist/WatchlistSearch';
import WatchlistConfirmationDialog from 'components/watchlist/ActionConfirmation';
import WatchlistService from '../../components/watchlist/WatchlistService';
import { setSelectedTickerSymbol } from '../../reducers/Watchlist';
const Header = props => {
  const { headerShadow, headerFixed, sidebarToggleMobile, showSidebar, sidebarToggle } = useSelector(
    state => state.ThemeOptions
  );
  const { isCompleteCompaniesDataLoaded, isCompleteCompaniesDataGlobalLoaded } = useSelector(state => state.Watchlist);
  const [confirmationClearFilterDialog, setConfirmationClearFilterDialog] = useState(false);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(setSidebarToggle(!sidebarToggle));
  };

  const toggleSidebarMobile = () => {
    dispatch(setSidebarToggleMobile(!sidebarToggleMobile));
  };
  const clearFilterHandler = state => {
    dispatch(setSelectedTickerSymbol(null));
    WatchlistService.clearFilter();
    setConfirmationClearFilterDialog(false);
  };

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
            <Box className="app-logo-wrapper">
              <Link to="/" className="header-logo-wrapper-link">
                <IconButton color="primary" size="medium">
                  <img className="app-header-logo-img-small" alt="SMA" src={projectLogo} />
                </IconButton>
              </Link>
              <Hidden smDown>
                <HeaderMenuSimple />
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
                    <IconButton color="inherit" onClick={toggleSidebar} size="medium" className="btn-inverse">
                      {sidebarToggle ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <HeaderMenuSimple />
            </Box>
          </Hidden>
          <WatchlistConfirmationDialog
            isOpen={confirmationClearFilterDialog}
            Agree={() => clearFilterHandler()}
            disAgree={() => setConfirmationClearFilterDialog(false)}
            actionName="filter"
          />

          {!isCompleteCompaniesDataLoaded || !isCompleteCompaniesDataGlobalLoaded ? (
            <div style={{ marginTop: '15px' }}>
              <span className="m-1 badge">Companies Data Loading...</span>
            </div>
          ) : null}

          <Box className="d-flex align-items-center">
            <div style={{ width: '200px' }}>
              <GlobalTickerSearchField />
            </div>
            <Notification />
            <HeaderUserbox />
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton color="inherit" onClick={toggleSidebarMobile} size="medium">
                  {sidebarToggleMobile ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

export default Header;
