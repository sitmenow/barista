import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { login, logout, syncUser, isUserAuthenticated } from './actions';
// Components
import AdminApp from './AdminApp';
import BaristaApp from './BaristaApp';
import CustomerApp from './CustomerApp';
import AppMenu from './components/app-menu/AppMenu';
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

  containerStyle = {
   marginTop: 0,
   marginBottom: 0,
   height: '100%',
   minWidth: '900px',
  };

  render() {
    return (
      <>
        <div className='ui relaxed grid container' style={ this.containerStyle }>
          <AppMenu />

          <Router>
            {/* Admin */}
            <Route exact={true} path="/admin" render={(props) => (<AdminApp {...props} />)}/>

            {/* Barista */}
            <Route exact={true} path="/barista" render={(props) => (<BaristaApp {...props} />)} />

            {/* Customer */}
            <Route exact={true} path="/" render={(props) => (
              <CustomerApp {...props} />
            )} />
            <Route exact={true} path="/profile" render={() => (<span>CUSTOMER PROFILE</span>) }/>
            <Route exact={true} path="/turns" render={() => (<span>CUSTOMER HISTORY OF TURNS</span>) }/>
          </Router>
        </div>
      </>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(App);
