import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';
// Components
import BranchesDashboard from './components/branchesDashboard/BranchesDashboard';
import TurnsDashboard from './components/turnsDashboard/connected';
// Styles


const mapStateToAppProps = (state, props) => {
  const customer = state.user.roles.customer;
  const branch = state.app.selectedBranch;
  const user = {
    name: state.user.name,
    email: state.user.email,
  };

  return Object.assign({}, props, { customer, branch, user });
};

const mapDispatchToAppProps = (dispatch) =>
  bindActionCreators({ }, dispatch);

class CustomerApp extends React.Component {
  render() {
    const { user, customer, branch } = this.props;

    return (
      <div className='seven wide column'>
        { branch && <TurnsDashboard user={ user } customer={ customer } branch={ branch } /> }
        { !branch && <BranchesDashboard /> }
      </div>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(CustomerApp);
