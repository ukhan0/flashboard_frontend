import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
const HeaderMenu = () => {
  const location = useLocation();
  return (
    <Fragment>
      <div className="app-header-menu">
        <Button
          component={Link}
          to="/watchlist"
          size="medium"
          color="inherit"
          className={clsx(
            'btn-inverse font-size-xs mx-2',
            location.pathname === '/watchlist' ? 'btn-active' : ''
          )}>
          Watchlist
        </Button>
        <Button
          size="medium"
          color="inherit"
          className="btn-inverse font-size-xs mx-2">
          Topic
        </Button>
        <Button
          size="medium"
          color="inherit"
          className="btn-inverse font-size-xs mx-2">
          Alerts
        </Button>
      </div>
    </Fragment>
  );
};

export default HeaderMenu;
