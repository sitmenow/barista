import React from 'react';

// import logo from './logo.svg';
import './App.css';
import './semantic/dist/semantic.css';

import Dashboard from './components/dashboard/connected';
import Menu from './components/menu/Menu';
import Turns from './components/turns/connected';
import store from './store';
import { actions } from './reducer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.auth = props.auth;
    this.api = props.api;

    this.handleAuthentication(
      props.location.hash, props.history, this.handleAuthorization.bind(this)
    );
  }

  handleAuthorization(token, profile) {
    this.api.setToken(token)
    const key = 'https://sitmenow:auth0:com/metadata';
    const { brand, branch, hostess } = profile[key];
    store.dispatch({ type: actions.SET_BRAND, brand });
    store.dispatch({ type: actions.SET_BRANCH, branch });
    store.dispatch({ type: actions.SET_BARISTA, barista: hostess });
  }

  handleAuthentication(hash, history, cb) {
    if (/access_token|id_token|error/.test(hash)) {
      return this.auth.handleAuthentication(history, cb);
    }

    if (!this.auth.isAuthenticated()) {
      this.auth.login();
    }
  }

  componentDidMount() {
    // store.subscribe(() => this.forceUpdate());
  }

  containerStyle = {
    margin: '20px',
  }

  columnStyle = {
    maxWidth: '480px',
    minWidth: '420px',
  }

  render() {
    return (
      <div style={ this.containerStyle } className='ui two column centered grid'>
        <div style={ this.columnStyle } className='column'>
          <Dashboard />
          <Menu />
          <Turns />
        </div>
      </div>
    );
  }
}

export default App;
