import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import WatchlistFiletypeEmail from './WatchlistFileTypeEmail';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 320,
    height: 'calc(100% - 150px)',
    top: 150
  },
  formGroup: {
    flexWrap: 'nowrap'
  }
}));

function WatchListCustomEmailAlertsSideBar({ open, handleCloseAgGridSideBar, title }) {
  const classes = useStyles();

  return (
    <Drawer anchor={'right'} open={open} onClose={handleCloseAgGridSideBar} classes={{ paper: classes.drawerPaper }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          {' '}
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          {' '}
          <IconButton onClick={handleCloseAgGridSideBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ marginLeft: '10px', height: 'calc(100% - 64px)', top: 64 }}>
        <WatchlistFiletypeEmail />
      </div>
    </Drawer>
  );
}

export default WatchListCustomEmailAlertsSideBar;
