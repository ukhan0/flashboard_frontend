import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, CircularProgress, Backdrop } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchBackdrop, setSearchBackdropHighlights } from '../../reducers/Topic';
import topicStyles from './leftSidebarStyles';
import { Sidebar, Header, Footer } from '../../layout-components';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';

const LeftSidebar = ({ children }) => {
  const { cancelTokenSource, showBackdrop, cancelTokenSourceHighlights, isCompanyClick } = useSelector(state => state.Topic);
  const { sidebarToggle, sidebarFixed, footerFixed, contentBackground, showSidebar } = useSelector(state => state.ThemeOptions);
  const location = useLocation();

  const dispatch = useDispatch()
  const classes = topicStyles();
  const closeBackdrop = () => {
    if (!cancelTokenSource) {
      cancelTokenSourceHighlights.cancel()
      dispatch(setSearchBackdropHighlights(null))
    } else {
      cancelTokenSource.cancel()
      // cancelTokenSourceHighlights.cancel()
      dispatch(setSearchBackdrop(null, false))
      dispatch(setSearchBackdropHighlights(null))
    }
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
            {
              get(location, 'pathname', null) !== '/comparision' ?
                <Footer />
                :
                null
            }
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={showBackdrop}>
          <div className={classes.backdropContent}>
            <CircularProgress color="inherit" />
            <p className="mb-2"></p>
            {isCompanyClick ? null : (
              <>
                <p className="text-white mb-2">Performing Search</p>
                <Button color="primary" className={'text-danger'} onClick={closeBackdrop}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </Backdrop>
      </div>
    </Fragment>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

export default LeftSidebar;
