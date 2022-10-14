import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SnackBar from '../Snackbar';
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


const useStyle = makeStyles({
  loader: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: 10,
    left: 0,
    right: 0
  },
  pageHeader: {
    padding: '8px 0'
  },
  pageHeading: {
    fontSize: 14
  },
  gridLayoutContainer: {
    marginTop: 8
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
  const [isHomePageSideBarOpen, setIsHomePageSideBarOpen] = useState(false);
  const [sidebarSelectedWidget, setSidebarSelectedWidget] = useState(getHomepageWidgets());
  const [enableDragResizeWidgets, setEnableDragResizeWidgets] = useState(false);
  const [snackbar, setSnackBar] = useState({ isSnackBar: false, message: '', severity: 'success' });
  const { isLoading } = useSelector(state => state.HomePage);
  const { user } = useSelector(state => state.User);
  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };

  const handleSideBar = () => {
    setIsHomePageSideBarOpen((prevState) => {
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
      const response = await axios.post(`${config.apiUrl}/api/users/save_home_widgets`,
        { user_id: user.id, home_widgets: sidebarSelectedWidget });

      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        setSnackBar({ isSnackBar: true, message: 'Home Widgets saved', severity: 'success' });
        localStorage.setItem(homepageWidgetsKey, JSON.stringify(sidebarSelectedWidget));
      } else {
        setSnackBar({ isSnackBar: true, message: responsePayload.message, severity: 'error' });
      }
    } catch (error) {
      setSnackBar({ isSnackBar: true, message: 'Unable to save home widgets', severity: 'error' });
    }

    setIsHomePageSideBarOpen(false);
  };
  useEffect(() => {
    dispatch(getUserWatchlist(['domestic', 'global']));
  }, [dispatch]);

  return (
    <div className="home-page">
      <SnackBar
        open={get(snackbar, 'isSnackBar', false)}
        onClose={() =>
          setSnackBar({
            isSnackBar: false,
            message: get(snackbar, 'message', null),
            severity: get(snackbar, 'severity', '')
          })
        }
        message={get(snackbar, 'message', null)}
        severity={get(snackbar, 'severity', '')}
        anchorOrigin={anchorOrigin}
      />

      <div className={classes.loader}> {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>

      <Grid container justify="space-between" alignItems='center' className={classes.pageHeader}>
        <Grid item>
          <span className={clsx([classes.pageHeading, 'font-weight-bold'])}>Dashboard Widgets</span>
        </Grid>
        <Grid item>
          <Button onClick={handleSideBar}
            color="primary"
            variant="contained"
            className={clsx([classes.button])}
          >
            Customize Dashboard
          </Button>
        </Grid>
      </Grid>

      <Slide direction="down" in={isHomePageSideBarOpen} mountOnEnter unmountOnExit>
        <Paper>
          <HomePageWidgetDrawer
            title={'Dashboard Widgets'}
            open={isHomePageSideBarOpen}
            handleSideBar={handleSideBar}
            widgets={sidebarSelectedWidget}
            handleColumns={handleColumns}
            handleSaveSelected={handleSaveSelected}
          />
        </Paper>
      </Slide>

      <div className={classes.gridLayoutContainer}>
        <HomeGridLayout enableDragResizeWidgets={enableDragResizeWidgets} sidebarSelectedWidget={sidebarSelectedWidget} />
      </div>
    </div>
  );
}
