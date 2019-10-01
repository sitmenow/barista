import API from '../../api';
import { actions } from './reducer'


const api = new API().getInstance();

export const selectBranch = (branchId) =>
  async (dispatch: Function, getState: Function) => {
    const branch = {
      id: branchId,
      name: 'Wizeline',
      picture: '/terrible_juan_wizeline.jpg',
      brand: {
        name: 'El Terrible Juan',
        picture: '/terrible_juan_logo.jpg',
      },
    };

    dispatch({ type: actions.UPDATE_SELECTED_BRANCH , branch });
  };

