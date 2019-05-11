import API from '../../api';
import { actions } from './reducer'
import { actions as globalActions } from '../../reducer';

export const loadTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const { brand, branch, barista } = getState();

    const api = new API().getInstance();
    const brandResource = api.brand({
      _id: brand.id,
    });
    const branchResource = brandResource.branch({
      _id: branch.id,
      _brand: brandResource,
    });

    dispatch({ type: globalActions.START_LOAD });

    try {
      const turns = await branchResource.turns();
      dispatch({ type: actions.SET_TURNS, turns });
    } catch (error) {
      console.log('error loading turns')
    }

    dispatch({ type: globalActions.END_LOAD });
  }

export const serveTurn = (turnId) =>
  async (dispatch: Function, getState: Function) => {
    const { brand, branch, barista } = getState();

    const api = new API().getInstance();
    const brandResource = api.brand({ _id: brand.id });
    const branchResource = brandResource.branch({ _id: branch.id, _brand: brandResource });
    const turnResource = branchResource.turn({ _id: turnId, _branch: branchResource });

    dispatch({ type: globalActions.START_LOAD });

    try {
      turnResource.serve();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: actions.REMOVE_TURN, turnId });
      dispatch({ type: globalActions.UNLOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error serving turn');
    }

    dispatch({ type: globalActions.END_LOAD });
  }

export const rejectTurn = (turnId) =>
  async (dispatch: function, getState: function) => {
    const { brand, branch, barista } = getState();

    const api = new API().getInstance();
    const brandResource = api.brand({ _id: brand.id });
    const branchResource = brandResource.branch({ _id: branch.id, _brand: brandResource });
    const turnResource = branchResource.turn({ _id: turnId, _branch: branchResource });

    dispatch({ type: globalActions.START_LOAD });

    try {
      turnResource.reject();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: actions.REMOVE_TURN, turnId });
      dispatch({ type: globalActions.UNLOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error rejecting turn');
    }

    dispatch({ type: globalActions.END_LOAD });
  }

export const prepareTurn = (turnId) =>
  async (dispatch: function, getState: function) => {
    // LOCK BARISTA && UPDATE_TURN (status: preparing)

    const { brand, branch, barista } = getState();

    const api = new API().getInstance();
    const brandResource = api.brand({ _id: brand.id });
    const branchResource = brandResource.branch({ _id: branch.id, _brand: brandResource });
    const turnResource = branchResource.turn({ _id: turnId, _branch: branchResource });

    dispatch({ type: globalActions.START_LOAD });

    try {
      turnResource.prepare();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: globalActions.LOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error preparing turn');
    }

    dispatch({ type: globalActions.END_LOAD });
  }

export const unprepareTurn = (turnId) =>
  async (dispatch: function, getState: function) => {
    // UNLOCK BARISTA && UPDATE_TURN (status: waiting)

    const { brand, branch, barista } = getState();

    const api = new API().getInstance();
    const brandResource = api.brand({ _id: brand.id });
    const branchResource = brandResource.branch({ _id: branch.id, _brand: brandResource });
    const turnResource = branchResource.turn({ _id: turnId, _branch: branchResource });

    dispatch({ type: globalActions.START_LOAD });

    try {
      turnResource.unprepare();
      // dispatch({ type: actions.UPDATE_TURN /* , updatedTurn */ });
      dispatch({ type: globalActions.UNLOCK_BARISTA });
      // TODO: Show message of success
    } catch(error) {
      console.log('error preparing turn');
    }

    dispatch({ type: globalActions.END_LOAD });
  }

