import API from '../../api';
import User from '../../api/user';
import Branch from '../../api/branch';
import Brand from '../../api/brand';
import { actions } from './reducer'


const api = new API().getInstance();

export const serveTurn = (turnId) =>
  async (dispatch: Function, getState: Function) => {
    const { barista } = getState();

    const apiBrand = api.createBrand(barista.branch.brand);
    const apiBranch = apiBrand.createBranch(barista.branch);
    const apiTurn = apiBranch.turn({
      id: turnId, branch: apiBranch,
    });

    dispatch({ type: actions.START_LOAD });

    try {
      apiTurn.serve();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: actions.REMOVE_TURN, turnId });
      dispatch({ type: actions.UNLOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error serving turn');
    }

    dispatch({ type: actions.END_LOAD });
  }

export const rejectTurn = (turnId) =>
  async (dispatch: function, getState: function) => {
    const { barista } = getState();

    const apiBrand = api.createBrand(barista.branch.brand);
    const apiBranch = apiBrand.createBranch(barista.branch);
    const apiTurn = apiBranch.turn({
      id: turnId, branch: apiBranch,
    });

    dispatch({ type: actions.START_LOAD });

    try {
      apiTurn.reject();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: actions.REMOVE_TURN, turnId });
      dispatch({ type: actions.UNLOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error rejecting turn');
    }

    dispatch({ type: actions.END_LOAD });
  }

export const prepareTurn = (turnId) =>
  async (dispatch: function, getState: function) => {
    // LOCK BARISTA && UPDATE_TURN (status: preparing)

    const { barista } = getState();

    const apiBrand = api.createBrand(barista.branch.brand);
    const apiBranch = apiBrand.createBranch(barista.branch);
    const apiTurn = apiBranch.turn({
      id: turnId, branch: apiBranch,
    });

    dispatch({ type: actions.START_LOAD });

    try {
      apiTurn.prepare();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: actions.LOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error preparing turn');
    }

    dispatch({ type: actions.END_LOAD });
  }

export const unprepareTurn = (turnId) =>
  async (dispatch: function, getState: function) => {
    // UNLOCK BARISTA && UPDATE_TURN (status: waiting)

    const { barista } = getState();

    const apiBrand = api.createBrand(barista.branch.brand);
    const apiBranch = apiBrand.createBranch(barista.branch);
    const apiTurn = apiBranch.turn({
      id: turnId, branch: apiBranch,
    });

    dispatch({ type: actions.START_LOAD });

    try {
      apiTurn.unprepare();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: actions.UNLOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error preparing turn');
    }

    dispatch({ type: actions.END_LOAD });
  }

