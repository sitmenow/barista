import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TurnsList from './TurnsList';
import {
  loadBranchTurns, loadCustomerTurns, addTurn, removeTurn } from './actions';


const mapStateToTurnsListProps = (state, props) => {
  let turns;
  let user;
  let allowManagement;
  const { barista, customer } = props;

  if (barista) {
    user = barista;
    turns = barista.branch.turns;
    allowManagement = true;
  }

  if (customer) {
    user = customer;
    turns = customer.turns;
    allowManagement = false;
  }

  /*
  turns = [
    {
      id: 'turn-a-id',
      name: 'Gerardo Reyes',
      product: 'Cafe Latte',
      company: 'TechBridge IT',
    },
    {
      id: 'turn-b-id',
      name: 'Gerardo Reyes',
      product: 'Cafe Latte',
      company: 'TechBridge IT',
    }
  ];
  */

  return { turns, user, allowManagement };
};

const mapDispatchToTurnsListProps = (dispatch, props) => {
  let loadTurns;
  const { barista, customer } = props;

  if (barista) {
    loadTurns = loadBranchTurns;
  }

  if (customer) {
    loadTurns = loadCustomerTurns;
  }

  return bindActionCreators({ loadTurns, addTurn, removeTurn }, dispatch);
};

const mergeTurnsListProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

export default connect(
  mapStateToTurnsListProps,
  mapDispatchToTurnsListProps,
  mergeTurnsListProps,
)(TurnsList);
