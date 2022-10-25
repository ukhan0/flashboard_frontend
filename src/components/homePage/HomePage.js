import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import { getUserWatchlist } from './HomePageAction';
import { useDispatch } from 'react-redux';
import '../../../node_modules/react-grid-layout/css/styles.css';
import './HomePage.css';
import { homePageWidgets, homepageWidgetsKey } from "./homePageConfig";
import HomeGridLayout from './HomeGridLayout';
import axios from 'axios';
import config from '../../config/config';
import HomePageWidgetDrawer from './HomePageWidgetDrawer';
import { Paper, Button } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import clsx from 'clsx';
import { setSnackBarObj } from '../../reducers/Alerts';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyle = makeStyles({
  loader: {
    position: 'fixed',
    textAlign: 'center',
    zIndex: 10010,
    top: '70px',
    left: 0,
    right: 0
  },
  btn: {
    padding: 20,
    borderRadius: '50%',
    minWidth: 'unset',
    width: 32,
    height: 32,
    position: 'fixed',
    right: 0,
    top: 64,
    zIndex: 1000
  },
  gridLayoutContainer: {
    marginTop: 2
  },
  drawerContainer: {
    zIndex: 900,
    backgroundColor: '#ffffff',
    top: 64,
    position: 'sticky'
  }
});

const getHomepageWidgets = () => {
  let savedWidgets = localStorage.getItem(homepageWidgetsKey);
  savedWidgets = JSON.parse(savedWidgets);

  // if new widget add and not exists in prev localstorage
  // then get from the config
  savedWidgets = savedWidgets ? { ...savedWidgets } : homePageWidgets;
  let finalWidgets = [];

  // convert saved widgets into array
  Object.keys(savedWidgets).forEach((item) => {
    if (savedWidgets[item].show)
      finalWidgets.push({ name: item, ...savedWidgets[item] });
  })

  return finalWidgets;
};

export default function HomePage() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [isHomePageDrawerOpen, setIsHomePageDrawerOpen] = useState(false);
  const [drawerSelectedWidget, setSidebarSelectedWidget] = useState(getHomepageWidgets());
  const [enableDragResizeWidgets, setEnableDragResizeWidgets] = useState(false);
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

  const handleColumns = (selectedWidget, status) => {
    if (status) {
      setSidebarSelectedWidget(prevState => {
        return [...prevState, selectedWidget];
      });
    } else {
      setSidebarSelectedWidget(prevState => {
        return prevState.filter((item) => {
          return item.name !== selectedWidget.name
        });
      });
    }
  };

  const handleSaveSelected = async () => {
    const convertSelectWidgetData = {};
    drawerSelectedWidget.forEach((item) => {
      convertSelectWidgetData[item.name] = item
    });

    try {
      const response = await axios.post(`${config.apiUrl}/api/users/update_user`,
        { id: user.id, home_widgets: convertSelectWidgetData });

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
      <Button onClick={handleDrawer}
        color="primary"
        variant="contained"
        className={clsx([classes.button, classes.btn])}
      >
        <SettingsIcon />
      </Button>

      <Slide direction="down" in={isHomePageDrawerOpen} mountOnEnter unmountOnExit>
        <Paper className={classes.drawerContainer} id='widget-drawer-container'>
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
