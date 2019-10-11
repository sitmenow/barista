import API from '../../api';
import User from '../../api/user';
import Branch from '../../api/branch';
import Brand from '../../api/brand';
import { actions } from './reducer'


const api = new API().getInstance();

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
        dispatch({ type: actions.ADD_CUSTOMER_TURN, turn: createdTurn });
        dispatch({ type: actions.END_LOAD });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: actions.END_LOAD });
      });
  };

