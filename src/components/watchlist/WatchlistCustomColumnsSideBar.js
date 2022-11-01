import React from 'react';
import Action from './WatchlistActions/WatchlistActions';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
                    control={
                      <Checkbox
                        checked={
                          props.dispalyedColumns && props.dispalyedColumns.length
                            ? props.dispalyedColumns.indexOf(item.colId) > -1
                            : true
                        }
                      />
                    }
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
