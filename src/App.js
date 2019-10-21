import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { login, logout, isUserAuthenticated, syncUser, cleanSelectedBranch } from './actions';
// Components
import AdminApp from './AdminApp';
import BaristaApp from './BaristaApp';
import CustomerApp from './CustomerApp';
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
  bindActionCreators(
    { login, logout, isUserAuthenticated, syncUser, cleanSelectedBranch },
    dispatch
  );

class App extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.isUserAuthenticated()) {
      // TODO: Rename this function since it does more than it says
      this.props.syncUser();
    } else {
      this.props.login(this.props.location.hash, this.props.history);
    }

    this.state = {
      menu: {
        isTurnsOptionSelected: false,
        isVenuesOptionSelected: true,
        isProfileOptionSelected: false,
        isOrganizationOptionSelected: false,
      },
    };
  }

  handleTurnsOptionSelection = () => {
    this.props.cleanSelectedBranch();

    this.setState({
      menu: {
        isTurnsOptionSelected: true,
        isVenuesOptionSelected: false,
        isProfileOptionSelected: false,
        isOrganizationsOptionSelected: false,
      },
    });
  };

  handleVenuesOptionSelection = () => {
    this.props.cleanSelectedBranch();

    this.setState({
      menu: {
        isVenuesOptionSelected: true,
        isTurnsOptionSelected: false,
        isProfileOptionSelected: false,
        isOrganizationsOptionSelected: false,
      },
    });
  };

  handleProfileOptionSelection = () => {
    this.props.cleanSelectedBranch();

    this.setState({
      menu: {
        isProfileOptionSelected: true,
        isVenuesOptionSelected: false,
        isTurnsOptionSelected: false,
        isOrganizationsOptionSelected: false,
      },
    });
  };

  handleOrganizationsOptionSelection = () => {
    this.props.cleanSelectedBranch();

    this.setState({
      menu: {
        isOrganizationsOptionSelected: true,
        isProfileOptionSelected: false,
        isVenuesOptionSelected: false,
        isTurnsOptionSelected: false,
      },
    });
  };

  renderAdminApp = (props) => (
    <AdminApp {...props} menu={ this.state.menu } >
      <Menu
        {...this.state.menu}
        profileOptionOnclick={ () => this.handleProfileOptionSelection() }
      />
    </AdminApp>
  );

  renderBaristaApp = (props) => (
    <BaristaApp {...props} menu={ this.state.menu } >
      <Menu
        {...this.state.menu}
        profileOptionOnClick={ () => this.handleProfileOptionSelection() }
        venuesOptionOnClick={ () => this.handleVenuesOptionSelection() }
      />
    </BaristaApp>
  );

  renderCustomerApp = (props) => (
    <CustomerApp {...props} menu={ this.state.menu } >
      <Menu
        {...this.state.menu}
        profileOptionOnClick={ () => this.handleProfileOptionSelection() }
        venuesOptionOnClick={ () => this.handleVenuesOptionSelection() }
        turnsOptionOnClick={ () => this.handleTurnsOptionSelection() }
      />
    </CustomerApp>
  );

  render() {
    return (
      <div className='ui relaxed grid container app'>
        <Router>
          { this.props.isAdminPathEnabled && <Route exact={ true } path="/admin" render={ this.renderAdminApp } /> }
          { this.props.isBaristaPathEnabled && <Route exact={ true } path="/barista" render={ this.renderBaristaApp } /> }
          <Route exact={ true } path="/logout" render={() => (this.props.logout()) }/>
          { this.props.isCustomerPathEnabled && <Route exact={ true } path="/" render={ this.renderCustomerApp } /> }

          {/* TODO: Create 404 page */}
        </Router>
      </div>
    );
  }
}

export default connect(
  mapStateToAppProps,
  mapDispatchToAppProps
)(App);
