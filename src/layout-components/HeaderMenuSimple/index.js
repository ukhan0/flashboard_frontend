import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const HeaderMenu = () => {
  return (
    <Fragment>
      <div className="app-header-menu">
        <Button
          component={Link}
          to="/watchlist"
          size="medium"
          color="inherit"
          className="btn-inverse font-size-xs mx-2">
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
