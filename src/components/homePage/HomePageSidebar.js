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
  Grid,
  Switch, Button
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { homePageWidgets } from './homePageConfig';
import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 320,
    height: 'calc(100% - 150px)',
    top: 150
  },
  formGroup: {
    flexWrap: 'nowrap'
  },
  sidebarBody: {
    padding: '0 8px',
    height: 'calc(100% - 64px)'
  }
}));

const homePageWidgetsList = Object.keys(homePageWidgets);

function HomePageSidebar({
  title,
  widgets,
  open,
  handleCloseSideBar,
  handleColumns,
  enableDragResizeWidgets,
  handleDragResizeWidgets,
  handleSaveSelected
}) {
  const classes = useStyles();
  const getWidgetStatus = key => {
    const rest = get(widgets, key, null);
    return rest ? rest.show : false;
  };

  return (
    <Drawer anchor={'right'} open={open} onClose={handleCloseSideBar} classes={{ paper: classes.drawerPaper }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleCloseSideBar()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <div className={classes.sidebarBody}>
        <FormControl component="fieldset" className={classes.formControl} fullWidth>
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              value={enableDragResizeWidgets}
              control={
                <Switch
                  checked={enableDragResizeWidgets}
                  onChange={handleDragResizeWidgets}
                  color="primary"
                  name="enableDragResizeWidgets"
                />
              }
              label="Enable Drag/Resize"
            />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            {homePageWidgetsList.map((key, index) => {
              return (
                <FormControlLabel
                  control={<Checkbox checked={getWidgetStatus(key)} />}
                  name={key}
                  label={homePageWidgets[key].title}
                  key={key}
                  value={getWidgetStatus(key)}
                  onChange={(e, v) => {
                    handleColumns(key, v);
                  }}
                />
              );
            })}
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              size="small"
              onClick={handleSaveSelected}>
              Save
            </Button>
          </FormGroup>
        </FormControl>


      </div>
    </Drawer>
  );
}

export default HomePageSidebar;
