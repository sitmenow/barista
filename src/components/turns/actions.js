import API from '../../api';
import { actions } from './reducer'
import { actions as globalActions } from '../../reducer';

export const loadTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const { brand, branch, barista } = getState();

    const api = new API().getInstance();
    const brandResource = api.brand({ _id: brand.id });
    const branchResource = brandResource.branch({ _id: branch.id });

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
    const branchResource = brandResource.branch({ _id: branch.id });
    const turnResource = branchResource.turn({ _id: turnId });

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
    const branchResource = brandResource.branch({ _id: branch.id });
    const turnResource = branchResource.turn({ _id: turnId });

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

export const prepareTurn = () =>
  async (dispatch: function, getstate: function) => {
    dispatch({ type: globalActions.LOCK_BARISTA });
    // LOCK BARISTA && UPDATE_TURN (status: preparing)
  }

export const unprepareTurn = () =>
  async (dispatch: function, getstate: function) => {
    dispatch({ type: globalActions.UNLOCK_BARISTA });
    // UNLOCK BARISTA && UPDATE_TURN (status: waiting)
  }

