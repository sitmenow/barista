import { actions } from './reducer'


export const selectBranch = (branch) =>
  async (dispatch: Function, getState: Function) => {

    dispatch({ type: actions.UPDATE_SELECTED_BRANCH, branch });
  };

