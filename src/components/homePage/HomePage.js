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
import HomePageSidebar from './HomePageSidebar';
import { homePageWidgets, homepageWidgetsKey } from "./homePageConfig";
import HomeGridLayout from './HomeGridLayout';

const useStyle = makeStyles({
  loader: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: 10,
    left: 0,
    right: 0
  },
  widgetSelect: {
    position: 'fixed',
    right: '-74px',
    top: '68px',
    transform: 'rotate(90deg)',
    zIndex: 2000,
    cursor: 'pointer',
    backgroundColor: 'lightgray',
    padding: '2px 8px'
  }
});

const getHomepageWidgets = () => {
  const savedWidgets = localStorage.getItem(homepageWidgetsKey);
  return savedWidgets ? JSON.parse(savedWidgets) : homePageWidgets;
};

export default function HomePage() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [snackbar, setSnackBar] = useState(null);
  const [isHomePageSideBarOpen, setIsHomePageSideBarOpen] = useState(false);
  const [sidebarSelectedWidget, setSidebarSelectedWidget] = useState(getHomepageWidgets());
  const [enableDragResizeWidgets, setEnableDragResizeWidgets] = useState(true);
  const { isLoading } = useSelector(state => state.HomePage);
  const anchorOrigin = { vertical: 'top', horizontal: 'center' };
  // const handleSnackBar = data => {
  //   setSnackBar(data);
  // };

  const handleCloseSideBar = () => {
    setIsHomePageSideBarOpen(false);
  };

  const handleOpenSideBar = () => {
    setIsHomePageSideBarOpen(true);
  };

  const handleColumns = (key, status) => {
    setSidebarSelectedWidget(prevState => {
      const clone = cloneDeep(prevState);
      clone[key].show = status;
      return clone;
    });
  };

  const handleDragResizeWidgets = () => {
    setEnableDragResizeWidgets(prevState => !prevState);
  };

  const handleSaveSelected = () => {
    localStorage.setItem(homepageWidgetsKey, JSON.stringify(sidebarSelectedWidget));
  };
  useEffect(() => {
    dispatch(getUserWatchlist(['domestic', 'global']));
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className={classes.loader}> {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>
      <div className={classes.widgetSelect} onClick={handleOpenSideBar}>
        Dashboard Widgets
      </div>
      <HomePageSidebar
        title={'Dashboard Widgets'}
        open={isHomePageSideBarOpen}
        handleCloseSideBar={handleCloseSideBar}
        widgets={sidebarSelectedWidget}
        handleColumns={handleColumns}
        enableDragResizeWidgets={enableDragResizeWidgets}
        handleDragResizeWidgets={handleDragResizeWidgets}
        handleSaveSelected={handleSaveSelected}
      />
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

      <HomeGridLayout enableDragResizeWidgets={enableDragResizeWidgets} sidebarSelectedWidget={sidebarSelectedWidget} />
    </div>
  );
}
