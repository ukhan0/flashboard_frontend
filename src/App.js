import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './config/configureStore';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { Provider } from 'react-redux';
import Routes from './Routes';
import CacheBridge from './CacheBridge';
import NotificationAlerts from './components/notification/NotificationAlerts';
import ScrollToTop from './utils/ScrollToTop';
import DateFnsUtils from '@date-io/date-fns';
import './assets/base.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
// Ag Grid styles
import config from './config/config';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ReactGA from 'react-ga';
import './utils/fortawesomeIcons';

const store = configureStore();
if (config.googleAnalyticsKey) {
  ReactGA.initialize(config.googleAnalyticsKey);
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename="/">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <ScrollToTop>
              <NotificationAlerts />
              <CacheBridge />
              <Routes />
            </ScrollToTop>
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
