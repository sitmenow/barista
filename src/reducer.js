import { combineReducers } from 'redux';

import { turnsReducer } from './components/turns/reducer';


const app = {
  status: {
    loading: false,
  },
};

const user = {
  id: null,
  apiToken: null, // :thinking_face:
  name: '',
  roles: new Set(['customer']),
  status: {
    authenticated: false,
  },
};

const barista = {
  status: {
    isLocked: false,
  },
  branch: {
    id: null,
    name: null,
    logo: null,
    lastOpeningTime: null,
    brand: {
      id: null,
      name: null,
    },
  },
};

const customer = {
  status: {},
};

const actions = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
  UPDATE_BARISTA: 'UPDATE_BARISTA',
  LOCK_BARISTA: 'LOCK_BARISTA',
  UNLOCK_BARISTA: 'UNLOCK_BARISTA',
  START_LOAD: 'START_LOAD',
  END_LOAD: 'END_LOAD',
  UPDATE_AUTHENTICATION: 'UPDATE_AUTHENTICATION',
};

function customerReducer(state = customer, action) {
  return state;
}

function baristaReducer(state = barista, action) {
  let status;

  switch(action.type) {
    case actions.UPDATE_BARISTA:
      const brand = {
        id: action.brand.id,
        name: action.brand.name,
      }
      const branch = {
        brand,
        id: action.branch.id,
        name: action.branch.name,
        lastOpeningTime: action.branch.lastOpeningTime,
        logo: action.branch.logo,
      };
      status = {
        isLocked: false,
      };

      return { branch, status };
    case actions.LOCK_BARISTA:
      status = Object.assign({}, state.status, { isLocked: true });
      return Object.assign({}, state, status);
    case actions.UNLOCK_BARISTA:
      status = Object.assign({}, state.status, { isLocked: false });
      return Object.assign({}, state, status);
    default:
      return state;
  }
}

function userReducer(state=user, action) {
  let status;

  switch(action.type) {
    case actions.UPDATE_AUTHENTICATION:
      status = { authenticated: action.authenticated };
      return Object.assign({}, state, { status });
    default:
      return state;
  }
}

function appReducer(state=app, action) {
  let status;

  switch(action.type) {
    case actions.START_LOAD:
      status = { loading: true };
      return Object.assign({}, state, { status });
    case actions.END_LOAD:
      status = { loading: false };
      return Object.assign({}, state, { status });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  barista: baristaReducer,
  customer: customerReducer,
  turns: turnsReducer,
});


export { actions, rootReducer };
