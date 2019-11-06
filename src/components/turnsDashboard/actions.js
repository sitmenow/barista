import API from '../../api';
import User from '../../api/user';
import Brand from '../../api/brand';
import Branch from '../../api/branch';
import { actions } from './reducer'


const api = new API().getInstance();

export const loadBranchActiveTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const branch = getState().app.selectedBranch;
    const apiBrand = new Brand(branch.brand, api.requester);
    const apiBranch = new Branch(
      Object.assign({}, branch, { brand: apiBrand }),
      api.requester
    )

    dispatch({ type: actions.START_LOAD });

    return apiBranch
      .getTurns()
      .then((turns) => {
        dispatch({ type: actions.SET_BARISTA_ACTIVE_TURNS, turns });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        dispatch({ type: actions.END_LOAD });
      });
  };

export const loadCustomerActiveTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const user = getState().user;
    const apiUser = new User(user, api.requester);

    dispatch({ type: actions.START_LOAD });

    return apiUser
      .getTurns()
      .then((turns) => {
        dispatch({ type: actions.SET_CUSTOMER_ACTIVE_TURNS, turns });
        dispatch({ type: actions.END_LOAD });
      })
      .catch ((error) => {
        dispatch({ type: actions.END_LOAD });
      });
  }

export const createTurnAsCustomer = (turn) =>
  async (dispatch: Function, getState: Function) => {
    const branch = getState().app.selectedBranch;
    const apiBrand = new Brand(branch.brand, api.requester);
    const apiBranch = new Branch(
      Object.assign({}, branch, { brand: apiBrand }),
      api.requester
    );

    dispatch({ type: actions.START_LOAD });

    apiBranch
      .createTurn(turn)
      .then((createdTurn) => {
        dispatch({ type: actions.ADD_CUSTOMER_ACTIVE_TURN, turn: createdTurn });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  };

export const createTurnAsBarista = (turn) => 
  async (dispatch: Function, getState: Function) => {
    const branch = getState().app.selectedBranch;
    const apiBrand = new Brand(branch.brand, api.requester);
    const apiBranch = new Branch(
      Object.assign({}, branch, { brand: apiBrand }),
      api.requester
    );

    dispatch({ type: actions.START_LOAD });

    apiBranch
      .createTurn(turn)
      .then((createdTurn) => {
        dispatch({ type: actions.ADD_BRANCH_ACTIVE_TURN, turn: createdTurn });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  };
