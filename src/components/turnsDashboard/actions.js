import API from '../../api';
import { actions } from './reducer'
import { actions as globalActions } from '../../reducer';


const api = new API().getInstance();

export const loadBranchTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const { barista } = getState();
    const { branch } = barista;
    const { brand } = branch;

    const brandResource = api.brand({ _id: brand.id });
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

export const loadCustomerTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const { barista } = getState();
    const { branch } = barista;
    const { brand } = branch;

    const brandResource = api.brand({ _id: brand.id });
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

export const addCustomerTurn = () =>
  async (dispatch: Function, getState: Function) => {};

export const removeCustomerTurn = () =>
  async (dispatch: Function, getState: Function) => {};

export const addBranchTurn = () =>
  async (dispatch: Function, getState: Function) => {};

export const removeBranchTurn = () =>
  async (dispatch: Function, getState: Function) => {};
