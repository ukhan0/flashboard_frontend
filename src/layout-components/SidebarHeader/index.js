import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box, Tooltip } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import projectLogo from '../../assets/images/logos/ca-logo-color-256.png';

import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const SidebarHeader = () => {
  const disptach = useDispatch();
  const toggleSidebar = () => {
    disptach(setSidebarToggle(!sidebarToggle));
  };
  const toggleSidebarMobile = () => {
    disptach(setSidebarToggleMobile(!sidebarToggleMobile));
  };

  const { sidebarToggleMobile, sidebarHover, sidebarToggle } = useSelector(state => state.ThemeOptions);

  return (
    <Fragment>
      <div
        className={clsx('app-sidebar-header', {
          'app-sidebar-header-close': sidebarToggle && !sidebarHover
        })}
        style={{ width: "100%" }}
      >
        <Box className="header-logo-wrapper" title="CA">
          <Link to="/" className="header-logo-wrapper-link">
            <IconButton color="primary" className='pt-0 py-0'>
              <img className="app-sidebar-logo" alt="CA" style={{ width: "108px" }} src={projectLogo} />
            </IconButton>
          </Link>
        </Box>
        <Box
          className={clsx('app-sidebar-header-btn', {
            'app-sidebar-header-btn-close': sidebarToggle && !sidebarHover
          })}>
          <Tooltip title="Toggle Sidebar" placement="right">
            <IconButton color="inherit" onClick={toggleSidebar} size="medium">
              {sidebarToggle ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box className="app-sidebar-header-btn-mobile">
          <Tooltip title="Toggle Sidebar" placement="right">
            <IconButton
              color="inherit"
              onClick={toggleSidebarMobile}
              size="medium">
              {sidebarToggleMobile ? (
                <MenuOpenRoundedIcon />
              ) : (
                <MenuRoundedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </Fragment>
  );
};

export default SidebarHeader;
