import { actions } from './reducer'


export const selectBranch = (branchId) =>
  async (dispatch: Function, getState: Function) => {

    // TODO: Call API to get branch OR get it as parameter
    const branch = {
      id: branchId,
      name: 'Wizeline',
      picture: '/terrible_juan_wizeline.jpg',
      brand: {
        name: 'El Terrible Juan',
        picture: '/terrible_juan_logo.jpg',
      },
    };

    dispatch({ type: actions.UPDATE_SELECTED_BRANCH, branch });
  };

