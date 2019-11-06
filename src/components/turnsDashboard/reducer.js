const actions = {
  SET_CUSTOMER_ACTIVE_TURNS: 'SET_CUSTOMER_ACTIVE_TURNS',
  ADD_CUSTOMER_ACTIVE_TURN: 'ADD_CUSTOMER_ACTIVE_TURN',
  REMOVE_CUSTOMER_ACTIVE_TURN: 'REMOVE_CUSTOMER_ACTIVE_TURN',

  SET_BARISTA_ACTIVE_TURNS: 'SET_BARISTA_ACTIVE_TURNS',
  ADD_BRANCH_ACTIVE_TURN: 'ADD_BRANCH_ACTIVE_TURN',
  REMOVE_BRANCH_ACTIVE_TURN: 'REMOVE_BRANCH_ACTIVE_TURN',

  PREPARE_TURN: 'PREPARE_TURN',
  UNPREPARE_TURN: 'UNPREPARE_TURN',
  FOCUS_TURN: 'FOCUS_TURN',
  UNFOCUS_TURN: 'UNFOCUS_TURN',

  START_LOAD: 'START_LOAD',
  END_LOAD: 'END_LOAD',
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
