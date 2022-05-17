import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AxiosInterceptor from './utils/axios';
import io from 'socket.io-client';
import SocketService from './socketService';
import config from 'config/config';
const socket = io.connect(config.socketUrl);
AxiosInterceptor.initalise();
SocketService.init(socket);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
