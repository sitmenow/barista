import { combineReducers } from 'redux';

import { turnsReducer } from './components/turnsDashboard/reducer';


const app = {
  status: {
    loading: false,
  },
  selectedBranch: null,
};

const customer = {
  status: {},
  turns: {
    active: [],
    completed: [],
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
    turns: {
      active: [],
      completed: [],
    },
    brand: {
      id: null,
      name: null,
    },
  },
};

const admin = {};

const owner = {};

const user = {
  id: null,
  name: null,
  email: null,
  picture: null,
  roles: {}, // Expected roles: customer, barista, owner & admin
  status: {
    authenticated: false,
  },
};

const actions = {
  // User
  SET_USER: 'SET_USER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
  UPDATE_USER_ROLE: 'UPDATE_USER_ROLE',


  // Customer
  SET_CUSTOMER_ACTIVE_TURNS: 'SET_CUSTOMER_ACTIVE_TURNS',
  ADD_CUSTOMER_ACTIVE_TURN: 'ADD_CUSTOMER_ACTIVE_TURN',
  REMOVE_CUSTOMER_ACTIVE_TURN: 'REMOVE_CUSTOMER_ACTIVE_TURN',

  // Barista
  LOCK_BARISTA: 'LOCK_BARISTA',
  UNLOCK_BARISTA: 'UNLOCK_BARISTA',
  SET_BARISTA_ACTIVE_TURNS: 'SET_BARISTA_ACTIVE_TURNS',
  ADD_BRANCH_ACTIVE_TURN: 'ADD_BRANCH_ACTIVE_TURN',
  REMOVE_BRANCH_ACTIVE_TURN: 'REMOVE_BRANCH_ACTIVE_TURN',

  // App
  UPDATE_SELECTED_BRANCH: 'UPDATE_SELECTED_BRANCH',
  START_LOAD: 'START_LOAD',
  END_LOAD: 'END_LOAD',
};


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
  switch(action.type) {
    case actions.SET_USER:
      var { id, name, email, picture } = action.user;
      return Object.assign({}, { id, name, email, picture, roles: { customer } });
    case actions.UPDATE_USER:
      var { id, name, email, picture } = action.user;
      return Object.assign({}, state, { id, name, email, picture });
    case actions.UPDATE_USER_STATUS:
      return Object.assign({}, state, { status: action.status });
    case actions.UPDATE_USER_ROLE:
      switch(action.role.type) {
        case 'customer':
          var roles = Object.assign({}, state.roles, { customer });
          return Object.assign({}, state, { roles });
          break;
        case 'hostess':
          var roles = Object.assign({}, state.roles, { barista });
          return Object.assign({}, state, { roles });
          break;
        case 'admin':
          state.roles = Object.assign({}, state.roles, { admin });
          return state;
          break;
        case 'owner':
          return Object.assign({}, state.roles, { owner });
          break;
      }
    case actions.SET_CUSTOMER_ACTIVE_TURNS:
      var active = action.turns;
      // TODO: Clean turns
      state.roles.customer.turns = Object.assign({}, state.roles.customer.turns, { active });
      return Object.assign({}, state);

    case actions.ADD_CUSTOMER_ACTIVE_TURN:
      // TODO: Clean turns
      state.roles.customer.turns.active = state.roles.customer.turns.active.map(
        turn => Object.assign({}, turn)
      );
      state.roles.customer.turns.active.push(action.turn);
      return Object.assign({}, state);

    case actions.REMOVE_CUSTOMER_ACTIVE_TURN:
      // TODO: Clean turns
      state.roles.customer.turns.active = state.roles.customer.turns.active.reduce((turns, turn) => {
        if (turn.id != action.turn.id) {
          turns.push(Object.assign({}, turn));
        }

        return turns;
      }, []);
      return Object.assign({}, state);

    case actions.SET_BARISTA_ACTIVE_TURNS:
      var active = action.turns;
      // TODO: Clean turns
      state.roles.barista.branch.turns = Object.assign({}, state.roles.barista.branch.turns, { active });
      return Object.assign({}, state);

    case actions.ADD_BRANCH_ACTIVE_TURN:
      // TODO: Clean turns
      state.roles.barista.branch.turns.active = state.roles.barista.branch.turns.active.map(
        turn => Object.assign({}, turn)
      );
      state.roles.barista.branch.turns.active.push(action.turn);
      return Object.assign({}, state);

    case actions.REMOVE_BRANCH_ACTIVE_TURN:
      // TODO: Clean turns
      state.roles.barista.branch.turns.active = state.roles.barista.branch.turns.active.reduce((turns, turn) => {
        if (turn.id != action.turn.id) {
          turns.push(Object.assign({}, turn));
        }

        return turns;
      }, []);
      return Object.assign({}, state);


    case actions.LOCK_BARISTA:
      state.roles.barista.status = Object.assign({}, state.roles.barista.status, { isLocked: true });
      return Object.assign({}, state);

    case actions.UNLOCK_BARISTA:
      state.roles.barista.status = Object.assign({}, state.roles.barista.status, { isLocked: false });
      return Object.assign({}, state);

    default:
      return state;
  }
}

function appReducer(state=app, action) {

  switch(action.type) {

    case actions.START_LOAD:
      var status = { loading: true };
      return Object.assign({}, state, { status });
    case actions.END_LOAD:
      var status = { loading: false };
      return Object.assign({}, state, { status });

    case actions.UPDATE_SELECTED_BRANCH:
      var { branch } = action;
      return Object.assign({}, state, { selectedBranch: branch });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});


export { actions, rootReducer };
