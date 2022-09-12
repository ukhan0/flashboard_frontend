import React from 'react';
import WatchlistService from './WatchlistService';
import Action from './WatchlistActions/WatchlistActions';
import {
  Drawer,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  makeStyles,
  IconButton,
  Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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

function WatchlistCustomColumnsSideBar(props) {
  const classes = useStyles();

  const handleColumns = (e, status) => {
    props.handleColumns(e, status);
  };

 

  return (
    <Drawer
      anchor={'right'}
      open={props.open}
      onClose={props.handleCloseAgGridSideBar}
      classes={{ paper: classes.drawerPaper }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          {' '}
          <Typography variant="h5">{props.title}</Typography>
        </Grid>
        <Grid item>
          {' '}
          <IconButton onClick={() => props.handleCloseAgGridSideBar()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ marginLeft: '10px', height: 'calc(100% - 64px)', top: 64 }}>
        {props.isAgGridActions ? (
          <Action />
        ) : (
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup className={classes.formGroup}>
              {props.currentCol.map(item => {
                return !item.hide ? (
                  <FormControlLabel
                    control={<Checkbox checked={props.dispalyedColumns.indexOf(item.colId) > -1} />}
                    name={item.colId}
                    label={item.headerName}
                    key={item.colId}
                    value={item.colId}
                    onChange={(e, v) => {
                      handleColumns(e, v);
                    }}
                  />
                ) : null;
              })}
            </FormGroup>
          </FormControl>
        )}
      </div>
    </Drawer>
  );
}

export default WatchlistCustomColumnsSideBar;
