import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';
import App from './App';

var ws = new WebSocket('ws://localhost:8080/ws/');    // event emmited when connected
console.log(ws);
ws.onmessage = function (ev) {
  console.log('websocket on message');
  console.log(ev);
}
ws.onopen = function () {
  console.log('websocket is connected ...')        // sending a send event to websocket server
  ws.send('connected')
}    // event emmited when receiving message 


ReactDOM.render(
  <Router>
    <Route path="/" render={(props) => (
      <Provider store={store}>
        <App {...props} />
      </Provider>
    )} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
