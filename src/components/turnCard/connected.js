import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TurnCard from './TurnCard';
import {
  prepareTurn, unprepareTurn, serveTurn, rejectTurn } from './actions';


const mapStateToTurnCardProps = (state, props) => props;

const mapDispatchToTurnCardProps = (dispatch, props) => {
  return bindActionCreators(
    { prepareTurn, unprepareTurn, serveTurn, rejectTurn },
    dispatch
  );
};

const mergeTurnCardProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

export default connect(
  mapStateToTurnCardProps,
  mapDispatchToTurnCardProps,
  mergeTurnCardProps,
)(TurnCard);
