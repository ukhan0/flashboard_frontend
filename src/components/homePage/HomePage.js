import React from 'react';
import HomePageTable from './HomePageTable';
import HomePageSmaLime1 from './HomePageSmaLime1';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SnackBar from '../Snackbar';
import { get } from 'lodash';
import HomePageNotification from './HomepageNotification';
import HomePageTweets from './HomePageTweets';
import { getUserWatchlist } from './HomePageAction';
import { useDispatch } from 'react-redux';
import '../../../node_modules/react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './HomePage.css'

const useStyle = makeStyles({
  loader: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: 10,
    left: 0,
    right: 0
  }
});

const layout = {
  "xl": [
    {
      "w": 4,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "HomePageTable",
      "moved": false,
      "static": false
    },
    {
      "w": 4,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "HomePageNotification",
      "moved": false,
      "static": false
    },
    {
      "w": 4,
      "h": 2,
      "x": 4,
      "y": 0,
      "i": "HomePageSmaLime1",
      "moved": false,
      "static": false
    },
    {
      "w": 4,
      "h": 2,
      "x": 4,
      "y": 2,
      "i": "HomePageTweets",
      "moved": false,
      "static": false
    }
  ],
  "lg": [
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "HomePageTable",
      "moved": false,
      "static": false
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "HomePageNotification",
      "moved": false,
      "static": false
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 0,
      "i": "HomePageSmaLime1",
      "moved": false,
      "static": false
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 2,
      "i": "HomePageTweets",
      "moved": false,
      "static": false
    }
  ],
  "xxs": [
    {
      "w": 1,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "HomePageTable"
    },
    {
      "w": 1,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "HomePageNotification"
    },
    {
      "w": 1,
      "h": 2,
      "x": 0,
      "y": 4,
      "i": "HomePageSmaLime1"
    },
    {
      "w": 1,
      "h": 2,
      "x": 0,
      "y": 6,
      "i": "HomePageTweets"
    }
  ],
  "sm": [
    {
      "w": 1,
      "h": 2,
      "x": 1,
      "y": 0,
      "i": "HomePageTable",
      "moved": false,
      "static": false
    },
    {
      "w": 1,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "HomePageNotification",
      "moved": false,
      "static": false
    },
    {
      "w": 1,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "HomePageSmaLime1",
      "moved": false,
      "static": false
    },
    {
      "w": 1,
      "h": 2,
      "x": 1,
      "y": 2,
      "i": "HomePageTweets",
      "moved": false,
      "static": false
    }
  ],
  "md": [
    {
      "w": 2,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "HomePageTable",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "HomePageNotification",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 2,
      "x": 2,
      "y": 0,
      "i": "HomePageSmaLime1",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 2,
      "x": 2,
      "y": 2,
      "i": "HomePageTweets",
      "moved": false,
      "static": false
    }
  ]
};

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function HomePage() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [snackbar, setSnackBar] = React.useState(null);
  const { isLoading } = useSelector(state => state.HomePage);
  const anchorOrigin = { vertical: 'top', horizontal: 'center' };
  const handleSnackBar = data => {
    setSnackBar(data);
  };

  const handleLayoutChange = (layout, layouts) => {
    localStorage.setItem('grid-layout', JSON.stringify(layouts));
  };

  const getLayouts = () => {
    const savedLayouts = localStorage.getItem('grid-layout');
    return savedLayouts ? JSON.parse(savedLayouts) : layout;
  };

  React.useEffect(() => {
    dispatch(getUserWatchlist(['domestic', 'global']));
  }, [dispatch]);
  return (
    <div className='home-page'>
      <div className={classes.loader}> {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}</div>
      <ResponsiveGridLayout
        layouts={getLayouts()}
        breakpoints={{ xl: 1600, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ xl: 8, lg: 6, md: 4, sm: 2, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={'100%'}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        margin={[10, 10]}
        compactType={'vertical'}>
        <div key={'HomePageTable'}>
          <HomePageTable />
        </div>
        <div key={'HomePageNotification'}>
          <HomePageNotification />
        </div>
        <div key={'HomePageSmaLime1'}>
          <HomePageSmaLime1 handleSnackBar={handleSnackBar} />
        </div>
        <div key={'HomePageTweets'}>
          <HomePageTweets />
        </div>
      </ResponsiveGridLayout>

      
    </div>
  );
}
