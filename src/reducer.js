import { combineReducers } from 'redux';

import { turnsReducer } from './components/turns/reducer';

const brand = {
  id: null,
  name: null,
};

const branch = {
    id: null,
    name: null,
    logo: null,
    lastOpeningTime: null,
};

const barista = {
    id: null,
    name: 'Gerardo Reyes',
    role: 'Barista',
    isPreparing: false,
};

const actions = {
  SET_BRAND: 'SET_BRAND',
  SET_BRANCH: 'SET_BRANCH',
  SET_BARISTA: 'SET_BARISTA',
  LOCK_BARISTA: 'LOCK_BARISTA',
  UNLOCK_BARISTA: 'UNLOCK_BARISTA',
  START_LOAD: 'START_LOAD',
  END_LOAD: 'END_LOAD',
};

function brandReducer(state = brand, action) {
  switch(action.type) {
    case actions.SET_BRAND:
      const { id, name } = action.brand;
      return { id, name };
    default:
      return state;
  }
}

function branchReducer(state = branch, action) {
  switch(action.type) {
    case actions.SET_BRANCH:
      const { id, name, lastOpeningTime, logo } = action.branch;
      return { id, name, lastOpeningTime, logo };
    default:
      return state;
  }
}

function baristaReducer(state = barista, action) {
  switch(action.type) {
    case actions.SET_BARISTA:
      return Object.assign(action.barista, { isPreparing: false });
    case actions.LOCK_BARISTA:
      return Object.assign({}, state, { isPreparing: true });
    case actions.UNLOCK_BARISTA:
      return Object.assign({}, state, { isPreparing: false });
    default:
      return state;
  }
}

function loadingReducer(state=null, action) {
  switch(action.type) {
    case actions.START_LOAD:
      return true;
    case actions.END_LOAD:
      return false;
    default:
      return null;
  }
}

const rootReducer = combineReducers({
  brand: brandReducer,
  branch: branchReducer,
  barista: baristaReducer,
  turns: turnsReducer,
  isLoading: loadingReducer,
});

export {
  actions,
  rootReducer,
};
