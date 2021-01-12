import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import Routes from './Routes';
import ScrollToTop from './utils/ScrollToTop';
import './assets/base.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
// Ag Grid styles
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './utils/fortawesomeIcons';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CssBaseline />
          <ScrollToTop>
            <Routes />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
