import React, { Fragment } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import SidebarHeader from '../../layout-components/SidebarHeader';
import SidebarUserbox from '../../layout-components/SidebarUserbox';
import SidebarMenu from '../../layout-components/SidebarMenu';
import { setIsFromSideBar } from '../../reducers/Topic';
import { useDispatch } from 'react-redux';
import navItems from './navItems';
import { hoverTime } from '../../config/appConfig';
import {
  setSidebarToggleMobile,
  setSidebarHover,
  setSidebarToggle,
  setSidebarFooter,
  setSidebarUserbox
} from '../../reducers/ThemeOptions';
import './SidebarMenu.css';

const Sidebar = ({
  setSidebarToggleMobile,
  sidebarToggleMobile,
  sidebarFixed,
  sidebarHover,
  setSidebarHover,
  sidebarToggle,
  sidebarUserbox,
  sidebarShadow,
  selectedItem
}) => {
  const dispatch = useDispatch();
  const toggleTimer = React.useRef(null);
  const toggleHoverOn = event => {
    let { currentTarget } = event;
    currentTarget.style.cursor = 'wait';
    toggleTimer.current = setTimeout(function() {
      setSidebarHover(true);
      currentTarget.style.cursor = 'default';
    }, hoverTime);
  };
  const toggleHoverOff = () => {
    clearTimeout(toggleTimer.current);
    setSidebarHover(false);
  };

  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);
  const handleSearchTerm = () => {
    dispatch(setIsFromSideBar(true));
  };

  const sidebarMenuContent = (
    <div
      className={clsx({
        'app-sidebar-nav-close': sidebarToggle && !sidebarHover,
        'sidebar-menu-item-disable': selectedItem && Object.keys(selectedItem).length === 0
      })}>
      {navItems.map(list => (
        <SidebarMenu
          component="div"
          key={list.label}
          pages={list.content}
          title={list.label}
          onClick={() => handleSearchTerm()}
        />
      ))}
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg">
          <SidebarHeader />
          <PerfectScrollbar>
            {sidebarUserbox && selectedItem ? <SidebarUserbox /> : null}
            {sidebarMenuContent}
            {/* {sidebarFooter && <SidebarFooter />} */}
          </PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          onMouseEnter={toggleHoverOn}
          onMouseLeave={toggleHoverOff}
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-close': sidebarToggle,
            'app-sidebar-wrapper-open': sidebarHover,
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          open={sidebarToggle}
          elevation={sidebarShadow ? 11 : 3}>
          <SidebarHeader />
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed,
              'app-sidebar-collapsed': sidebarToggle && !sidebarHover
            })}>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarUserbox && selectedItem ? <SidebarUserbox /> : null}
              <div style={{ marginTop: 10 }}></div>
              {sidebarMenuContent}
              {/* {sidebarFooter && <SidebarFooter />} */}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover,
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarFooter: state.ThemeOptions.sidebarFooter,
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  selectedItem: state.Watchlist.selectedItem
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable)),
  setSidebarToggle: enable => dispatch(setSidebarToggle(enable)),
  setSidebarHover: enable => dispatch(setSidebarHover(enable)),
  setSidebarFooter: enable => dispatch(setSidebarFooter(enable)),
  setSidebarUserbox: enable => dispatch(setSidebarUserbox(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
