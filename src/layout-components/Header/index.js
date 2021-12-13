import React, { Fragment, useState, useEffect } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Hidden, IconButton, AppBar, Box, Tooltip, Button } from '@material-ui/core';
import { checkIsFilterActive } from '../../components/watchlist/WatchlistHelpers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/logos/sma-logo.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderMenuSimple from '../../layout-components/HeaderMenuSimple';
import useStyles from '../../components/watchlist/watchlistStyles';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import GlobalTickerSearchField from '../../components/watchlist/WatchlistSearch';
import WatchlistConfirmationDialog from 'components/watchlist/ActionConfirmation';
import WatchlistService from '../../components/watchlist/WatchlistService';
import { setWatchlistSearchText, setSelectedTickerSymbol } from '../../reducers/Watchlist';
const Header = props => {
  const {
    headerShadow,
    headerFixed,
    setSidebarToggle,
    sidebarToggle,
    showSidebar,
    setSidebarToggleMobile,
    sidebarToggleMobile
  } = props;
  const { searchText } = useSelector(state => state.Watchlist);
  const [isFilterActive, setIsFilterActive] = useState(checkIsFilterActive());
  const [isFilterActiveOnSearch, setIsFilterActiveOnSearch] = useState(null);
  const [confirmationClearFilterDialog, setConfirmationClearFilterDialog] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const clearFilterHandler = state => {
    dispatch(setSelectedTickerSymbol(null));
    WatchlistService.clearFilter();
    setIsFilterActive(false);
    setConfirmationClearFilterDialog(false);
    dispatch(setWatchlistSearchText(''));
  };
  useEffect(() => {
    setIsFilterActiveOnSearch(searchText);
  }, [searchText]);

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
                <IconButton color="primary" size="medium" className="app-logo-btn">
                  <img className="app-logo-img" alt="SMA" src={projectLogo} />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">SMA</Box>
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
          <Box className="d-flex align-items-center">
            {isFilterActive || isFilterActiveOnSearch ? (
              <Button
                color="primary"
                className={classes.button}
                size="small"
                variant="contained"
                onClick={() => {
                  setConfirmationClearFilterDialog(true);
                }}>
                Clear Filtering
              </Button>
            ) : null}

            <div style={{ width: '200px' }}>
              <GlobalTickerSearchField />
            </div>

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
