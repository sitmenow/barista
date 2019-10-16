import API from '../../api';
import User from '../../api/user';
import { actions } from './reducer'


const api = new API().getInstance();

export const loadBaristaBranches = () =>
  async (dispatch: Function, getState: Function) => {
  };

export const loadCustomerBranches = () =>
  async (dispatch: Function, getState: Function) => {
    dispatch({ type: actions.START_LOAD });

    return api.getBranches()
      .then((branches) => {
        dispatch({ type: actions.END_LOAD });
        return branches;
      })
      .catch((error) => {
        console.error('Error loading customer branches');
        dispatch({ type: actions.END_LOAD });
        return [];
      });
  };
