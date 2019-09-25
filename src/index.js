import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { actions } from './reducer';
import App from './App';


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
