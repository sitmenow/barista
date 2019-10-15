import Auth from './auth/auth0';
import API from './api';
import User from './api/user';
import { actions } from './reducer';


// TODO: Take this from env
new API({
  protocol: 'http',
  host: 'localhost',
  port: '8080',
  version: 'v1',
})

// Any unauthorized api call should dispatch a logout
const api = new API().getInstance();
const auth = new Auth({});

export const login = (hash, history) =>
  (dispatch: Function, getState: Function) => {
    auth.login(hash, history, (token, profile) => {
      // Set token in API singleton object
      api.setToken(token);

      const user = Object.assign(profile, { id: profile.sub });
      localStorage.setItem('user', JSON.stringify(user));

      syncUser()(dispatch, getState);
    });
  };

export const logout = () =>
  (dispatch: Function, getState: Function) => {
    // Remove token from API singleton object
    api.removeToken();

    auth.logout();
    localStorage.removeItem('user');
  };

export const syncUserRoles = () =>
  (dispatch: Function, getState: Function) => {
    const user = getState().user;

    const apiUser = new User(user, api.requester);

    apiUser
      .getRoles()
      .then((roles) =>
        roles.map(role => dispatch({ type: actions.UPDATE_USER_ROLE, role }))
      )
      .catch();
  };

export const syncUserTurns = () =>
  (dispatch: Function, getState: Function) => {
    const user = getState().user;

    const apiUser = new User(user, api.requester);

    apiUser
      .getTurns()
      .then(turns => dispatch({ type: actions.SET_CUSTOMER_ACTIVE_TURNS, turns }))
      .catch();
  };

// SyncUser means we already have a user, either in the state or
// in the local storage. Any error here should redirect to login.
export const syncUser = () =>
  async (dispatch: Function, getState: Function) => {
    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    )
    const token = localStorage.getItem('accessToken');

    if (!token || !user.id) logout()(dispatch, getState);

    api.setToken(token);
    api.getUser(user.id)
      .catch((error) => {
          if (error.statusCode != 404) return Promise.reject(error);

          const apiUser = new User(user, api.requester);

          return apiUser
            .register()
            .catch(error => Promise.reject(error));
        })
        .then((stored) => {
          dispatch({
            type: actions.SET_USER,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              picture: user.picture,
              status: {
                authenticated: true,
              },
            }
          });

          syncUserRoles()(dispatch, getState);
          syncUserTurns()(dispatch, getState);
        })
        .catch();
  };

export const isUserAuthenticated = () =>
  (dispatch: Function, getState: Function) => {
    return auth.isAuthenticated();
  };

export const cleanSelectedBranch = () =>
  async (dispatch: Function, getState: Function) => {
    const branch = null;

    dispatch({ type: actions.UPDATE_SELECTED_BRANCH, branch });
  }

