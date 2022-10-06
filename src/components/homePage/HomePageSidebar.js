import React from 'react';
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

function HomePageSidebar(props) {
  console.log(props.widgets)
  const classes = useStyles();

  const handleColumns = (e, status) => {
    props.handleColumns(e, status);
  };

  return (
    <Drawer
      anchor={'right'}
      open={props.open}
      onClose={props.handleCloseSideBar}
      classes={{ paper: classes.drawerPaper }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          {' '}
          <Typography variant="h5">{props.title}</Typography>
        </Grid>
        <Grid item>
          {' '}
          <IconButton onClick={() => props.handleCloseSideBar()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ marginLeft: '10px', height: 'calc(100% - 64px)', top: 64 }}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup className={classes.formGroup}>
              {Object.keys(props.widgets).map((key , index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          props.widgets[key].show
                        }
                      />
                    }
                    name={key}
                    label={props.widgets[key].title}
                    key={key}
                    value={props.widgets[key].status}
                    onChange={(e, v) => {
                      handleColumns(key, v);
                    }}
                  />
                )
              })}
            </FormGroup>
          </FormControl>
      </div>
    </Drawer>
  );
}

export default HomePageSidebar;
