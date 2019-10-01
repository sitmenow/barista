const actions = {
  SET_TURNS: 'SET_TURNS',
  ADD_TURN: 'ADD_TURN',
  REMOVE_TURN: 'REMOVE_TURN',
  UPDATE_TURN: 'UPDATE_TURN',
  PREPARE_TURN: 'PREPARE_TURN',
  UNPREPARE_TURN: 'UNPREPARE_TURN',
  FOCUS_TURN: 'FOCUS_TURN',
  UNFOCUS_TURN: 'UNFOCUS_TURN',
};

function turnsReducer(state=[], action) {
  switch(action.type) {
    case actions.SET_TURNS:
      return action.turns;
    case actions.REMOVE_TURN:
      return state.filter(turn => turn.id !== action.turnId);
    default:
      return state;
  }
}

export {
  actions,
  turnsReducer,
};
