
function prepareTurn(turnId) {
  return {
    type: 'PREPARE_TURN',
    turnId: turnId,
  };
}

function serveTurn(turnId) {
  return {
    type: 'SERVE_TURN',
    turnId: turnId,
  };
}

function rejectTurn(turnId) {
  return {
    type: 'REJECT_TURN',
    turnId: turnId,
  };
}

function setBranch(branch) {
  return {
    type: 'SET_BRANCH',
    branch: branch,
  };
}

function setBarista(barista) {
  return {
    type: 'SET_BARISTA',
    barista: barista,
  };
}

function setTurns(turns) {
  return {
    type: 'SET_TURNS',
    turns: turns,
  };
}

export {
  prepareTurn,
  serveTurn,
  rejectTurn,
  setBranch,
  setBarista,
  setTurns,
}
