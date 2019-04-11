
function branchReducer(state={}, action) {
  switch(action.type) {
    case 'SET_BRANCH':
      return action.branch;
    default:
      return state;
  }
}

function baristaReducer(state={}, action) {
  switch(action.type) {
    case 'SET_BARISTA':
      return action.barista;
    default:
      return state;
  }
}

function turnsReducer(state=[], action) {
  switch(action.type) {
    case 'SET_TURNS':
      return action.turns;
    default:
      return state;
  }
}

export {
  branchReducer,
  baristaReducer,
  turnsReducer,
}
