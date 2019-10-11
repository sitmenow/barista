import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TurnsDashboard from './TurnsDashboard';
import {
  loadBranchTurns,
  loadCustomerTurns,
  addBranchTurn,
  addCustomerTurn,
  removeBranchTurn,
  removeCustomerTurn,
} from './actions';


const mapStateToTurnsDashboardProps = (state, props) => {
  let turns;
  let role;
  let allowManagement;

  console.log(props);
  const { user, barista, customer, branch } = props;

  if (barista) {
    role = barista;
    turns = barista.branch.turns;
    allowManagement = true;
  }

  if (customer) {
    role = customer;
    turns = customer.turns;
    allowManagement = false;
  }

  return { turns, user, role, allowManagement, branch };
};

const mapDispatchToTurnsDashboardProps = (dispatch, props) => {
  let loadTurns;
  let addTurn;
  let removeTurn;

  const { barista, customer } = props;

  if (barista) {
    loadTurns = loadBranchTurns;
    addTurn = addBranchTurn;
    removeTurn = removeBranchTurn;
  }

  if (customer) {
    loadTurns = loadCustomerTurns;
    addTurn = addCustomerTurn;
    removeTurn = removeCustomerTurn;
  }

  return bindActionCreators({ loadTurns, addTurn, removeTurn }, dispatch);
};

const mergeTurnsDashboardProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

export default connect(
  mapStateToTurnsDashboardProps,
  mapDispatchToTurnsDashboardProps,
  mergeTurnsDashboardProps,
)(TurnsDashboard);
