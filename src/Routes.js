import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import { ClimbingBoxLoader } from 'react-spinners';

import MuiTheme from './theme';

// Layout Blueprints

import {
  LeftSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';

// Example Pages

import PagesLogin from './example-pages/PagesLogin';
import PagesRegister from './example-pages/PagesRegister';
import PagesRecoverPassword from './example-pages/PagesRecoverPassword';
import PagesError404 from './example-pages/PagesError404';
const LandingPage = lazy(() => import('./example-pages/LandingPage'));
const ProfilePage = lazy(() => import('./example-pages/PagesProfile'));
const DashboardReports = lazy(() => import('./example-pages/DashboardReports'));
const WatchList = lazy(() => import('./components/watchlist'));
const Comparision = lazy(() => import('./components/comparision'));

const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  const SuspenseLoading = () => {
    return (
      <Fragment>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClimbingBoxLoader color={'#5383ff'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Loading...
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Redirect exact from="/" to="/LandingPage" />
            <Route path={['/LandingPage']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/LandingPage" component={LandingPage} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>
            <Route
              path={[
                '/PagesLogin',
                '/PagesRegister',
                '/PagesRecoverPassword',
                '/PagesError404'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PagesLogin" component={PagesLogin} />
                    <Route path="/PagesRegister" component={PagesRegister} />
                    <Route
                      path="/PagesRecoverPassword"
                      component={PagesRecoverPassword}
                    />
                    <Route path="/PagesError404" component={PagesError404} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>
            <Route
              path={['/watchlist', '/filings', '/comparision', '/sentiments']}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/watchlist" component={WatchList} />
                    <Route path="/filings" component={DashboardReports} />
                    <Route path="/comparision" component={Comparision} />
                    <Route path="/sentiments" component={ProfilePage} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
