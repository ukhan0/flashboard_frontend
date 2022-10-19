import React from 'react';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Grid, Button
} from "@material-ui/core";
import { homePageWidgets } from './homePageConfig';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  mainContainer: {
    padding: '10px 20px'
  },
  btnSize: {
    width: 100
  }
}));

const homePageWidgetsList = Object.keys(homePageWidgets);

const HomePageWidgetDrawer = ({
  widgets,
  handleDrawer,
  handleColumns,
  handleSaveSelected
}) => {
  const classes = useStyles();
  const getWidgetStatus = key => {
    const status = widgets.find((item) => {
      return item.name === key;
    });
    return status ? status.show : false;
  };

  return (
    <div className={classes.mainContainer}>
      <FormControl component="fieldset" className={classes.formControl} fullWidth>
        <FormGroup className={classes.formGroup}>
          <Grid container>
            {homePageWidgetsList.map((key, index) => {
              return (
                <Grid item key={index}>
                  <FormControlLabel
                    control={<Checkbox checked={getWidgetStatus(key)} />}
                    name={key}
                    label={homePageWidgets[key].title}
                    key={key}
                    value={getWidgetStatus(key)}
                    onChange={(e, v) => {
                      handleColumns({ name: key, title: homePageWidgets[key].title, show: v }, v);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </FormGroup>


        <Grid container spacing={2}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              className={clsx([classes.button, classes.btnSize])}
              size="small"
              onClick={handleSaveSelected}>
              Save
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="contained"
              className={clsx([classes.button, classes.btnSize])}
              size="small"
              onClick={handleDrawer}>
              Close
            </Button>
          </Grid>
        </Grid>

      </FormControl>
    </div>
  );
}

export default HomePageWidgetDrawer;