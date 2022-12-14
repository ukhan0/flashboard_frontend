import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import smaLogo from '../../assets/images/logos/ca-logo-white.png';
import { useSelector } from 'react-redux';

const HeaderLogo = () => {
  const { sidebarToggle, sidebarHover } = useSelector(state => state.ThemeOptions);
  return (
    <Fragment>
      <div
        className={clsx('app-header-logo', {
          'app-header-logo-close': sidebarToggle,
          'app-header-logo-open': sidebarHover
        })}>
        <Box className="header-logo-wrapper" title="CA">
          <Link to="/" className="header-logo-wrapper-link">
            <IconButton color="primary" size="medium">
              <img className={`app-header-logo-img-${sidebarToggle ? 'small' : 'big'}`} alt="CA" src={smaLogo} />
            </IconButton>
          </Link>
        </Box>
      </div>
    </Fragment>
  );
};

export default HeaderLogo;
