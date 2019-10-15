import API from '../../api';
import User from '../../api/user';
import { actions } from './reducer'


const api = new API().getInstance();

export const loadBranchActiveTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const { barista } = getState();
    const { branch } = barista;
    const { brand } = branch;

    const brandResource = api.brand({ _id: brand.id });
    const branchResource = brandResource.branch({
      _id: branch.id,
      _brand: brandResource,
    });

    dispatch({ type: actions.START_LOAD });

    try {
      const turns = await branchResource.turns();
      dispatch({ type: actions.SET_TURNS, turns });
    } catch (error) {
      console.log('error loading turns')
    }

    dispatch({ type: actions.END_LOAD });

    return;
  }

export const loadCustomerActiveTurns = () =>
  async (dispatch: Function, getState: Function) => {
    const user = getState().user;

    const apiUser = new User(user, api.requester);

    apiUser
      .getTurns()
      .then((turns) => {
        dispatch({ type: actions.SET_CUSTOMER_ACTIVE_TURNS, turns });
        dispatch({ type: actions.END_LOAD });
      })
      .catch ((error) => {
        console.log('error loading turns');
        dispatch({ type: actions.END_LOAD });
      });
  }

export const addCustomerTurn = () =>
  async (dispatch: Function, getState: Function) => {};

export const removeCustomerTurn = () =>
  async (dispatch: Function, getState: Function) => {};

export const addBranchTurn = () =>
  async (dispatch: Function, getState: Function) => {};

export const removeBranchTurn = () =>
  async (dispatch: Function, getState: Function) => {};
