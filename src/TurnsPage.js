import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';
// Components
import TurnsDashboard from './components/turnsDashboard/connected';
// Styles


const mapStateToTurnsPageProps = (state, props) => {
  const customer = state.user.roles.customer;
  console.log(customer);
  const user = {
    name: state.user.name,
    email: state.user.email,
  };

  return Object.assign({}, props, { customer, user });
};

const mapDispatchToTurnsPageProps = (dispatch) =>
  bindActionCreators({ }, dispatch);

class TurnsPage extends React.Component {
  render() {
    const { user, customer } = this.props;

    return (
      <div className='seven wide column'>
        <TurnsDashboard user={ user } customer={ customer } />
      </div>
    );
  }
}

export default connect(
  mapStateToTurnsPageProps,
  mapDispatchToTurnsPageProps
)(TurnsPage);
