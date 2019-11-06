import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TurnsDashboard from './TurnsDashboard';
import {
  loadBranchActiveTurns,
  loadCustomerActiveTurns,
  createTurnAsCustomer,
  createTurnAsBarista,
} from './actions';


const mapStateToTurnsDashboardProps = (state, props) => {
  let activeTurns;
  let completedTurns;
  let role;
  let allowManagement;

  const { user, barista, customer, branch } = props;

  if (barista) {
    role = barista;
    activeTurns = barista.branch.turns.active;
    completedTurns = barista.branch.turns.completed;
    allowManagement = true;
  }

  if (customer) {
    role = customer;
    activeTurns = customer.turns.active;
    completedTurns = customer.turns.completed;
    allowManagement = false;
  }

  return { activeTurns, completedTurns, user, role, allowManagement, branch };
};

const mapDispatchToTurnsDashboardProps = (dispatch, props) => {
  let loadActiveTurns = () => async () => {};
  let loadCompletedTurns = () => async () => {};
  let createTurn = () => async () => {};

  const { barista, customer } = props;

  if (barista) {
    createTurn = createTurnAsBarista;
    loadActiveTurns = loadBranchActiveTurns;
    // loadCompletedTurns = () => async () => {};
  }

  if (customer) {
    createTurn = createTurnAsCustomer;
    loadActiveTurns = loadCustomerActiveTurns;
    // loadCompletedTurns = () => async () => {};
  }

  return bindActionCreators(
    { loadActiveTurns, loadCompletedTurns, createTurn },
    dispatch
  );
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
