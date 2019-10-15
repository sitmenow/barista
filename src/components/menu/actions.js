import { actions } from './reducer'


export const cleanSelectedBranch = () =>
  async (dispatch: Function, getState: Function) => {
    const branch = null;

    dispatch({ type: actions.UPDATE_SELECTED_BRANCH, branch });
  }


