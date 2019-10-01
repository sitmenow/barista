import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { login, logout, isUserAuthenticated, syncUser } from './actions';
// Components
import AdminApp from './AdminApp';
import BaristaApp from './BaristaApp';
import CustomerApp from './CustomerApp';
import Menu from './components/menu/Menu';
// Styles
import './semantic/dist/semantic.css';


const mapStateToAppProps = (state, props) => props;

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
      <>
        <div className='ui relaxed grid container' style={ this.containerStyle }>
          <Menu />

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
            <Route exact={true} path="/out" render={() => (this.props.logout()) }/>
          </Router>
        </div>
      </>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(App);
