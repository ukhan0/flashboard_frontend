import React, { Fragment } from 'react';

import clsx from 'clsx';

import { Paper } from '@material-ui/core';
import SnPLogo from '../../assets/images/logos/SP_Global_logo.png';

import { connect } from 'react-redux';

const Footer = props => {
  const { footerShadow, sidebarToggle, footerFixed } = props;
  return (
    <Fragment>
      <Paper
        square
        elevation={footerShadow ? 11 : 2}
        className={clsx('app-footer text-black-50', {
          'app-footer--fixed': footerFixed,
          'app-footer--fixed__collapsed': sidebarToggle
        })}>
        <div className="app-footer--inner">
          <div className="app-footer--first trade-logo">
            <div className="spGlobal-text">In Parternship with S&P Global</div>
            <div>
              <img alt="S&P Global" src={SnPLogo} width="100" />
            </div>
          </div>
          <div className="app-footer--second">
            <span>
              © 2021 by Social Market Analytics, Inc All rights reserved.
            </span>
          </div>
        </div>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed,
  footerShadow: state.ThemeOptions.footerShadow,
  sidebarToggle: state.ThemeOptions.sidebarToggle
});
export default connect(mapStateToProps)(Footer);
