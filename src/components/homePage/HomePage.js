import React, { useState, useEffect } from 'react';
import HomePageTable from './HomePageTable';
import HomePageSmaLime1 from './HomePageSmaLime1';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SnackBar from '../Snackbar';
import { cloneDeep, get } from 'lodash';
import HomePageNotification from './HomepageNotification';
import HomePageTweets from './HomePageTweets';
import { getUserWatchlist } from './HomePageAction';
import { useDispatch } from 'react-redux';
import '../../../node_modules/react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './HomePage.css';
import HomePageSidebar from './HomePageSidebar';
import { homePageWidgets, homePageWidgetlayout } from './homePageConfig';

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

const ResponsiveGridLayout = WidthProvider(Responsive);
const homepageGridLayoutKey = 'homepage-grid-layout';

export default function HomePage() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [snackbar, setSnackBar] = useState(null);
  const [isHomePageSideBarOpen, setIsHomePageSideBarOpen] = useState(false);
  const [sidebarSelectedWidget, setSidebarSelectedWidget] = useState(homePageWidgets);
  const { isLoading } = useSelector(state => state.HomePage);
  const anchorOrigin = { vertical: 'top', horizontal: 'center' };
  const handleSnackBar = data => {
    setSnackBar(data);
  };

  const handleLayoutChange = (layout, layouts) => {
    localStorage.setItem(homepageGridLayoutKey, JSON.stringify(layouts));
  };

  const getLayouts = () => {
    const savedLayouts = localStorage.getItem(homepageGridLayoutKey);
    return savedLayouts ? JSON.parse(savedLayouts) : homePageWidgetlayout;
  };

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

  useEffect(() => {
    dispatch(getUserWatchlist(['domestic', 'global']));
  }, [dispatch]);

  return (
    <div className='home-page'>
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

      <ResponsiveGridLayout
        layouts={getLayouts()}
        breakpoints={{ lg: 1200, xs: 0 }}
        cols={{ lg: 8, xs: 1 }}
        rowHeight={300}
        width={'100%'}
        onLayoutChange={handleLayoutChange}
        draggableHandle={'.drag-handle'}
        margin={[10, 10]}
        compactType={'horizontal'}
        resizeHandles={['se']}
        autoSize={true}
      >
        {sidebarSelectedWidget.homePageTable.show && (
          <div key={'HomePageTable'} data-grid={{ x: 0, y: 0, w: 4, h: 2 }}>
            <HomePageTable />
          </div>
        )}

        {sidebarSelectedWidget.homePageNotification.show && (
          <div key={'HomePageNotification'} data-grid={{ x: 0, y: 0, w: 4, h: 2 }}>
            <HomePageNotification />
          </div>
        )}

        {sidebarSelectedWidget.homePageSmaLime1.show && (
          <div key={'HomePageSmaLime1'} data-grid={{ x: 0, y: 0, w: 4, h: 2, "minW": 2, "minH": 2, "maxH": 3 }}>
            <HomePageSmaLime1 handleSnackBar={handleSnackBar} />
          </div>
        )}

        {sidebarSelectedWidget.homePageTweets.show && (
          <div key={'HomePageTweets'} data-grid={{ x: 0, y: 0, w: 4, h: 2 }}>
            <HomePageTweets />
          </div>
        )}
      </ResponsiveGridLayout>
    </div>
  );
}
