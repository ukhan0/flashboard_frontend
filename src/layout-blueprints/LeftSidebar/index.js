import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, CircularProgress, Backdrop} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchBackdrop } from '../../reducers/Topic';
import topicStyles from './leftSidebarStyles';
import { connect } from 'react-redux';
import { Sidebar, Header, Footer } from '../../layout-components';

const LeftSidebar = props => {
  const { children, sidebarToggle, sidebarFixed, footerFixed, contentBackground, showSidebar } = props;
  const { cancelTokenSource, showBackdrop } = useSelector(state => state.Topic);
  const dispatch = useDispatch()
  const classes = topicStyles();

  const closeBackdrop = () => {
    cancelTokenSource.cancel()
    dispatch(setSearchBackdrop(null, false))
  }

  return (
    <Fragment>
      <div className={clsx('app-wrapper', contentBackground)}>
        <Header />
        <div
          className={clsx('app-main', {
            'app-main-sidebar-static': !sidebarFixed
          })}>
          {showSidebar ? <Sidebar /> : null}
          <div
            className={clsx('app-content', {
              'app-content-sidebar-collapsed': sidebarToggle,
              'app-content-sidebar-fixed': sidebarFixed,
              'app-content-footer-fixed': footerFixed
            })}>
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={showBackdrop}>
          <div className={classes.backdropContent}>
            <CircularProgress color="inherit" />
            <p className="mb-2"></p>
            <p className="text-white mb-2">Performing Search</p>
            <Button color="primary" className={'text-danger'} onClick={closeBackdrop}>Cancel</Button>
          </div>
        </Backdrop>
      </div>
    </Fragment>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarFixed: state.ThemeOptions.sidebarFixed,

  headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground,
  showSidebar: state.ThemeOptions.showSidebar
});

export default connect(mapStateToProps)(LeftSidebar);
