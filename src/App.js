import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { login, logout, isUserAuthenticated, syncUser } from './actions';
// Components
import AdminApp from './AdminApp';
import BaristaApp from './BaristaApp';
import CustomerApp from './CustomerApp';
import TurnsPage from './TurnsPage';
import Menu from './components/menu/connected';
// Styles
import './semantic/dist/semantic.css';


const mapStateToAppProps = (state, props) => {
  const isCustomerPathEnabled = !!state.user.roles.customer;
  const isBaristaPathEnabled = !!state.user.roles.barista;
  const isAdminPathEnabled = false;

  return Object.assign(
    {},
    props,
    { isCustomerPathEnabled, isBaristaPathEnabled, isAdminPathEnabled }
  );
};

const mapDispatchToAppProps = (dispatch) =>
  bindActionCreators({ login, logout, isUserAuthenticated, syncUser }, dispatch);

class App extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.isUserAuthenticated()) {
      // TODO: Rename this function since it does more than it says
      this.props.syncUser();
    } else {
      this.props.login(this.props.location.hash, this.props.history);
    }
  }

  containerStyle = {
   marginTop: 0,
   marginBottom: 0,
   height: '100%',
   minWidth: '900px',
  };

  render() {
    return (
      <div className='ui relaxed grid container' style={ this.containerStyle }>
        <Router>
          <Menu />

          {/* Admin */}
          { this.props.isAdminPathEnabled &&
            <Route exact={true} path="/admin" render={ (props) => (<AdminApp {...props} />) }/>
          }

          {/* Barista */}
          { this.props.isBaristaPathEnabled &&
            <Route exact={true} path="/barista" render={ (props) => (<BaristaApp {...props} />) } />
          }

          {/* Customer */}
          <Route exact={true} path="/" render={ (props) => (<CustomerApp {...props} />) } />

          {/* Customer Active Turns */}
          <Route exact={true} path="/turns" render={ (props) => (<TurnsPage {...props} />) }/>

          <Route exact={true} path="/profile" render={() => (<span>CUSTOMER PROFILE</span>) }/>
          <Route exact={true} path="/out" render={() => (this.props.logout()) }/>

          {/* TODO: Create 404 page */}
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(App);
