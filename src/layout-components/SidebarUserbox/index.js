import React, { Fragment } from 'react';
import { Avatar, Box } from '@material-ui/core';
import clsx from 'clsx';
import { connect } from 'react-redux';

const SidebarUserbox = props => {
  const { sidebarToggle, sidebarHover, selectedItem } = props;

  return (
    <Fragment>
      <Box
        className={clsx('app-sidebar-userbox', {
          'app-sidebar-userbox--collapsed': sidebarToggle && !sidebarHover
        })}>
        <Avatar
          alt="Symbol"
          src={`https://activetraders.socialmarketanalytics.com/images/stock_icons/${selectedItem.ticker}.png`}
          className="app-sidebar-userbox-avatar"
        />
        <Box className="app-sidebar-userbox-name">
          <Box>
            <b>{selectedItem.ticker}</b>
          </Box>
          <Box className="app-sidebar-userbox-description">{selectedItem.companyName}</Box>
        </Box>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover,
  selectedItem: state.Watchlist.selectedItem
});

export default connect(mapStateToProps)(SidebarUserbox);
