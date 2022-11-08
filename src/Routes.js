import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ClimbingBoxLoader } from 'react-spinners';
import MuiTheme from './theme';
import config from './config/config';
// Layout Blueprints
import { LeftSidebar, MinimalLayout, PresentationLayout } from './layout-blueprints';

// Example Pages
import ReactGA from 'react-ga';
import PagesLogin from './example-pages/PagesLogin';
import PagesRegister from './components/signIn/UserSignIn';
import ImpersonateLogin from './components/signIn/ImpersonateSignIn';
import PagesRecoverPassword from './example-pages/PagesRecoverPassword';
import PagesError404 from './example-pages/PagesError404';
const LandingPage = lazy(() => import('./example-pages/LandingPage'));
const WatchList = lazy(() => import('./components/watchlist'));
const Comparision = lazy(() => import('./components/comparision'));
const Topic = lazy(() => import('./components/topic'));
const Sentiment = lazy(() => import('./components/sentiment'));
const Filings = lazy(() => import('./components/Filings'));
const SocialSentiment = lazy(() => import('./components/socialSentiment'));
const Guideline = lazy(() => import('./components/guidelines'));
const HomePage = lazy(() => import('./components/homePage'));
const UserSettings = lazy(() => import('./components/userSettings'));

const pageVariants = {
  initial: {
    opacity: 0
    // scale: 0.99
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
        <div className="text-muted font-size-xl text-center pt-3">Loading...</div>
      </div>
    </Fragment>
  );
};

const isLoginRequired = (authToken, path, location) => {
  let loginRequired = false;
  if (
    !authToken &&
    path !== '/PagesRegister' &&
    path !== '/LandingPage' &&
    path !== '/' &&
    path !== '/ImpersonateLogin'
  ) {
    loginRequired = true;
    localStorage.setItem('redirect_url', JSON.stringify(location));
  }
  return loginRequired;
};

const Routes = () => {
  const location = useLocation();
  if (config.googleAnalyticsKey) {
    ReactGA.pageview(window.location.pathname);
  }

  // if user is not loggedIn then redirect to login page.
  const authToken = localStorage.getItem('auth_token');
  const path = location.pathname;
  let loginRequired = isLoginRequired(authToken, path, location);

  return loginRequired ? (
    <Redirect to="/PagesRegister" />
  ) : (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Redirect exact from="/LandingPage" to="/" />
            {path === '/' ? (
              <Route path={['/']}>
                <PresentationLayout>
                  <Switch location={location} key={location.pathname}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}>
                      <Route path="/" component={LandingPage} />
                    </motion.div>
                  </Switch>
                </PresentationLayout>
              </Route>
            ) : (
              <>
                <Route
                  path={[
                    '/PagesLogin',
                    '/PagesRegister',
                    '/PagesRecoverPassword',
                    '/PagesError404',
                    '/ImpersonateLogin'
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
                        <Route path="/ImpersonateLogin" component={ImpersonateLogin} />
                        <Route path="/PagesRecoverPassword" component={PagesRecoverPassword} />
                        <Route path="/PagesError404" component={PagesError404} />
                      </motion.div>
                    </Switch>
                  </MinimalLayout>
                </Route>
                <Route
                  path={[
                    '/watchlist',
                    '/filings',
                    '/comparision',
                    '/sentiment',
                    '/topic',
                    '/socialSentiment',
                    '/guideline',
                    '/home',
                    '/settings',
                  ]}>
                  <LeftSidebar>
                    <Switch location={location} key={location.pathname}>
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}>
                        <Route path="/watchlist" component={WatchList} />
                        <Route path="/filings" component={Filings} />
                        <Route path="/comparision" component={Comparision} />
                        <Route path="/sentiment" component={Sentiment} />
                        <Route path="/topic" component={Topic} />
                        <Route path="/socialSentiment" component={SocialSentiment} />
                        <Route path="/guideline" component={Guideline} />
                        <Route path="/home" component={HomePage} />
                        <Route path="/settings" component={UserSettings} />

                      </motion.div>
                    </Switch>
                  </LeftSidebar>
                </Route>
              </>
            )}
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
