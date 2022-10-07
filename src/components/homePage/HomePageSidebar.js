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

function HomePageSidebar({ title, widgets, open, handleCloseSideBar, handleColumns }) {
  const classes = useStyles();

  return (
    <Drawer
      anchor={'right'}
      open={open}
      onClose={handleCloseSideBar}
      classes={{ paper: classes.drawerPaper }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          {' '}
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          {' '}
          <IconButton onClick={() => handleCloseSideBar()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ marginLeft: '10px', height: 'calc(100% - 64px)', top: 64 }}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup className={classes.formGroup}>
            {Object.keys(widgets).map((key, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        widgets[key].show
                      }
                    />
                  }
                  name={key}
                  label={widgets[key].title}
                  key={key}
                  value={widgets[key].status}
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
