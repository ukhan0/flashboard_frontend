import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { cloneDeep, get } from 'lodash';
import { getUserWatchlist } from './HomePageAction';
import { useDispatch } from 'react-redux';
import '../../../node_modules/react-grid-layout/css/styles.css';
import './HomePage.css';
import { homePageWidgets, homepageWidgetsKey } from "./homePageConfig";
import HomeGridLayout from './HomeGridLayout';
import axios from 'axios';
import config from '../../config/config';
import HomePageWidgetDrawer from './HomePageWidgetDrawer';
import { Paper, Grid, Button } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import clsx from 'clsx';
import { setSnackBarObj } from '../../reducers/Alerts';


const useStyle = makeStyles({
  loader: {
    position: 'fixed',
    textAlign: 'center',
    zIndex: 10010,
    top: '70px',
    left: 0,
    right: 0
  },
  pageHeader: {
    padding: '8px 4px',
    zIndex: 10000,
    backgroundColor: '#ffffff',
    top: '60px',
    position: 'sticky'
  },
  pageHeading: {
    fontSize: 14
  },
  btn: {
    padding: '4px 8px',
    fontSize: '13px',
    borderRadius: '0.3rem'
  },
  gridLayoutContainer: {
    marginTop: 8
  },
  drawerContainer: {
    zIndex: 10000,
    backgroundColor: '#ffffff',
    top: '112px',
    position: 'sticky'
  }
});

const getHomepageWidgets = () => {
  let savedWidgets = localStorage.getItem(homepageWidgetsKey);
  savedWidgets = JSON.parse(savedWidgets);

  // if new widget add and not exists in prev localstorage
  // then get from the config
  return savedWidgets ? { ...homePageWidgets, ...savedWidgets } : homePageWidgets;
};

export default function HomePage() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [isHomePageDrawerOpen, setIsHomePageDrawerOpen] = useState(false);
  const [drawerSelectedWidget, setSidebarSelectedWidget] = useState(getHomepageWidgets());
  const [enableDragResizeWidgets, setEnableDragResizeWidgets] = useState(true);
  const { isLoading } = useSelector(state => state.HomePage);
  const { user } = useSelector(state => state.User);

  const handleDrawer = () => {
    setIsHomePageDrawerOpen((prevState) => {
      return !prevState
    });
    setEnableDragResizeWidgets((prevState) => {
      return !prevState
    });
  };

  const handleColumns = (key, status) => {
    setSidebarSelectedWidget(prevState => {
      const clone = cloneDeep(prevState);
      clone[key].show = status;
      return clone;
    });
  };

  const handleSaveSelected = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/api/users/update_user`,
        { id: user.id, home_widgets: drawerSelectedWidget });

      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        dispatch(setSnackBarObj({ message: 'Widgets settings have been saved successfully.', severity: 'success' }));
        localStorage.setItem(homepageWidgetsKey, JSON.stringify(drawerSelectedWidget));
      } else {
        dispatch(setSnackBarObj({ message: responsePayload.message, severity: 'error' }));
      }
    } catch (error) {
      dispatch(setSnackBarObj({ message: 'An error has occurred. Please try again.', severity: 'error' }));
    }

    setIsHomePageDrawerOpen(false);
    setEnableDragResizeWidgets(false);
  };
  useEffect(() => {
    dispatch(getUserWatchlist(['domestic', 'global']));
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className={classes.loader}> {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>

      <Grid container justify="space-between" alignItems='center' className={classes.pageHeader}>
        <Grid item>
          <span className={clsx([classes.pageHeading, 'font-weight-bold'])}>Dashboard Widgets</span>
        </Grid>
        <Grid item>
          <Button onClick={handleDrawer}
            color="primary"
            variant="contained"
            className={clsx([classes.button, classes.btn])}
          >
            Customize Dashboard
          </Button>
        </Grid>
      </Grid>

      <Slide direction="down" in={isHomePageDrawerOpen} mountOnEnter unmountOnExit>
        <Paper className={classes.drawerContainer}>
          <HomePageWidgetDrawer
            open={isHomePageDrawerOpen}
            handleDrawer={handleDrawer}
            widgets={drawerSelectedWidget}
            handleColumns={handleColumns}
            handleSaveSelected={handleSaveSelected}
          />
        </Paper>
      </Slide>

      <div className={classes.gridLayoutContainer}>
        <HomeGridLayout enableDragResizeWidgets={enableDragResizeWidgets} drawerSelectedWidget={drawerSelectedWidget} />
      </div>
    </div>
  );
}
