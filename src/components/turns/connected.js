import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Turns from './Turns';
import { loadTurns, serveTurn, rejectTurn, prepareTurn, unprepareTurn } from './actions';

const mapStateToTurnsProps = (state) => {
  const turns = state.turns;

  const barista = {
    isPreparing: state.barista.isPreparing,
  };

  return { turns, barista };
};

const mapDispatchToTurnsProps = (dispatch) =>
  bindActionCreators(
    { loadTurns, serveTurn, rejectTurn, prepareTurn, unprepareTurn },
    dispatch
  );

const mergeTurnsProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

export default connect(
  mapStateToTurnsProps,
  mapDispatchToTurnsProps,
  // mergeTurnsProps,
)(Turns);
