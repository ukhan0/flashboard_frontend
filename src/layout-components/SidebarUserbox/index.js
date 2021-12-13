import React, { Fragment } from 'react';
import { Avatar, Box } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  tickerLogo: {
    '& .MuiAvatar-img': {
      objectFit: 'contain'
    }
  }
}));
const SidebarUserbox = props => {
  const classes = useStyles();
  const { sidebarToggle, sidebarHover } = useSelector(state => state.ThemeOptions);
  const { selectedItem } = useSelector(state => state.Watchlist);
  return (
    <Fragment>
      <Box
        className={clsx('app-sidebar-userbox', classes.tickerLogo, {
          'app-sidebar-userbox--collapsed': sidebarToggle && !sidebarHover
        })}>
        <Avatar
          alt="Symbol"
          src={`${config.companyLogoPath}${selectedItem.ticker}.png`}
          className="app-sidebar-userbox-avatar"
        />
        <Box className="app-sidebar-userbox-name">
          <Box>
            <b>{selectedItem.ticker}</b>
          </Box>
          <Box className="app-sidebar-userbox-description">{selectedItem.companyName}</Box>
          <Box>
            <b>Sector</b>
          </Box>
          <Box className="app-sidebar-userbox-description">{selectedItem.sector}</Box>
          <Box>
            <b>Industry</b>
          </Box>{' '}
          <Box className="app-sidebar-userbox-description">{selectedItem.industry}</Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default SidebarUserbox;
