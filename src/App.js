import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { login, logout, syncUser, isUserAuthenticated } from './actions';
// Components
import AdminApp from './AdminApp';
import BaristaApp from './BaristaApp';
import CustomerApp from './CustomerApp';
// Styles
import './semantic/dist/semantic.css';


const mapStateToAppProps = (state, props) => Object.assign({}, state, props);

const mapDispatchToAppProps = (dispatch) =>
  bindActionCreators({ login, logout, syncUser, isUserAuthenticated }, dispatch);

class App extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.isUserAuthenticated()) {
      // We need to login before mount happens
      this.props.login(this.props.location.hash, this.props.history);
    }
    // At this moment we still do not know if the user has been
    // authenticated or not so we continue the execution.
  }

  componentDidMount() {
    this.props.syncUser();
  }

  // <Route exact={true} path="/admin" render={(props) => (<App {...props} />)} />
  render() {
    return (
      <Router>
        {/* Admin */}
        // ADMIN DASHBOARD - INCLUDES ALL THE ORGS
        <Route exact={true} path="/admin" render={(props) => (<AdminApp {...props} />)}/>

        {/* Barista */}
        // BARISTA DASHBOARD - INCLUDES ALL BRANCHES AVAILABLE FOR THE BARISTA
        <Route exact={true} path="/barista" render={(props) => (<BaristaApp {...props} />)} />

        {/* Customer */}
        <Route exact={true} path="/" render={() => (<span>CUSTOMER DASHBOARD - INCLUDES ALL BRANCHES AVAILABLE FOR THE CUSTOMER</span>) }/>
        <Route exact={true} path="/profile" render={() => (<span>CUSTOMER PROFILE</span>) }/>
        <Route exact={true} path="/turns" render={() => (<span>CUSTOMER HISTORY OF TURNS</span>) }/>
        <Route exact={true} path="/brands/:brandId/" render={() => (<span>BRAND DETAILS </span>) }/>
        <Route exact={true} path="/brands/:brandId/branches/:branchId" render={() => (<span>BRANCH DETAILS + CUSTOMER TURNS IN BRANCH</span>) }/>
      </Router>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(App);
