import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import { connect } from 'react-redux';

import smaLogo from '../../assets/images/logos/ca-logo-white.png';

const HeaderLogo = props => {
  const { sidebarToggle, sidebarHover } = props;
  return (
    <Fragment>
      <div
        className={clsx('app-header-logo', {
          'app-header-logo-close': sidebarToggle,
          'app-header-logo-open': sidebarHover
        })}>
        <Box className="header-logo-wrapper" title="SMA">
          <Link to="/" className="header-logo-wrapper-link">
            <IconButton color="primary" size="medium">
              <img className={`app-header-logo-img-${sidebarToggle ? 'small' : 'big'}`} alt="SMA" src={smaLogo} />
            </IconButton>
          </Link>
        </Box>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover
});

export default connect(mapStateToProps)(HeaderLogo);
