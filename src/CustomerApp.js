import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';
// Components
import BranchesDashboard from './components/branchesDashboard/connected';
import TurnsDashboard from './components/turnsDashboard/connected';
// Styles


const mapStateToCustomerAppProps = (state, props) => {
  const customer = state.user.roles.customer;
  const branch = state.app.selectedBranch;
  const user = {
    name: state.user.name,
    email: state.user.email,
  };

  return Object.assign({}, props, { customer, branch, user });
};

const mapDispatchToCustomerAppProps = (dispatch) =>
  bindActionCreators({ }, dispatch);

class CustomerApp extends React.Component {
  render() {
    const { user, customer, branch } = this.props;

    return (
      <>
        {/* Decorates Menu */}
        { React.cloneElement(this.props.children, { turns: customer.turns.active }) }

        <div className='seven wide column'>
          { this.props.menu.isProfileOptionSelected && <div> Profile </div> }
          { this.props.menu.isTurnsOptionSelected && <TurnsDashboard user={ user } customer={ customer } /> }
          { this.props.menu.isVenuesOptionSelected && branch && <TurnsDashboard user={ user } customer={ customer } branch={ branch } /> }
          { this.props.menu.isVenuesOptionSelected && !branch && <BranchesDashboard customer={ customer }/> }
        </div>
      </>
    );
  }
}


export default connect(
  mapStateToCustomerAppProps,
  mapDispatchToCustomerAppProps
)(CustomerApp);
