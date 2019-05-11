import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './auth';
import API from './api';
import store from './store';

const auth = new Auth();
const api = new API({
  protocol: 'http',
  host: 'localhost',
  port: '8080',
  version: 'v1',
});

const index = (props) => {
  return (
    <Provider store={store}>
      <App auth={auth} api={api.getInstance()} {...props} />
    </Provider>
   );
};

const logout = ({ match, location, history }) => auth.logout();

ReactDOM.render(
  <Router component={App}>
    <Route path="/" render={index} />
    <Route exact={true} path="/logout" render={logout} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
