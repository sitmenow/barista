import API from '../../api';
import User from '../../api/user';
import Branch from '../../api/branch';
import Brand from '../../api/brand';
import Turn from '../../api/turn';
import { actions } from './reducer'


const api = new API().getInstance();

const createApiTurn = (getState, turn) => {
  const branch = getState().app.selectedBranch;
  const apiBrand = new Brand(branch.brand, api.requester);
  const apiBranch = new Branch(
    Object.assign({}, branch, { brand: apiBrand }),
    api.requester
  );

  return new Turn(
    Object.assign({}, turn, { branch }),
    api.requester,
  );
}

export const cancelTurn = (turn) =>
  async (dispatch: Function, getState: Function) => {
    const apiTurn = createApiTurn(getState, turn);

    dispatch({ type: actions.START_LOAD });

    apiTurn
      .cancel()
      .then((canceledTurn) => {
        dispatch({
          type: actions.REMOVE_CUSTOMER_ACTIVE_TURN,
          turn: canceledTurn,
        });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  }

export const serveTurn = (turn) =>
  async (dispatch: Function, getState: Function) => {
    const apiTurn = createApiTurn(getState, turn);

    dispatch({ type: actions.START_LOAD });

    apiTurn
      .serve()
      .then((servedTurn) => {
        // TODO: use canceled turn for the dispatch action
        dispatch({ type: actions.REMOVE_BRANCH_ACTIVE_TURN, turn: servedTurn });
        dispatch({ type: actions.UNLOCK_BARISTA });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  }

export const rejectTurn = (turn) =>
  async (dispatch: function, getState: function) => {
    const apiTurn = createApiTurn(getState, turn);

    dispatch({ type: actions.START_LOAD });

    apiTurn
      .reject()
      .then((rejectedTurn) => {
        // TODO: use canceled turn for the dispatch action
        dispatch({ type: actions.REMOVE_BRANCH_ACTIVE_TURN, turn: rejectedTurn });
        dispatch({ type: actions.UNLOCK_BARISTA });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  }

export const prepareTurn = (turn) =>
  async (dispatch: function, getState: function) => {
    const apiTurn = createApiTurn(getState, turn);

    dispatch({ type: actions.START_LOAD });

    apiTurn
      .prepare()
      .then((preparedTurn) => {
        // TODO: use canceled turn for the dispatch action
        // dispatch({ type: actions.UPDATE_BRANCH_ACTIVE_TURN, turn });
        // dispatch({ type: actions.LOCK_BARISTA });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  }

export const unprepareTurn = (turn) =>
  async (dispatch: function, getState: function) => {
    const apiTurn = createApiTurn(getState, turn);

    dispatch({ type: actions.START_LOAD });

    apiTurn
      .unprepare()
      .then((unpreparedTurn) => {
        // TODO: use canceled turn for the dispatch action
        // dispatch({ type: actions.UPDATE_BRANCH_ACTIVE_TURN, turn });
        // dispatch({ type: actions.UNLOCK_BARISTA });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  }

