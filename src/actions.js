import Auth from './auth/auth0';
import API from './api';
import { actions } from './reducer';


// TODO: Take this from env
new API({
  protocol: 'http',
  host: 'localhost',
  port: '8080',
  version: 'v1',
})

const api = new API().getInstance();
const auth = new Auth({});

export const login = (hash, history) =>
  (dispatch: Function, getState: Function) => {
    auth.login(hash, history, (token, _profile) => {
      // Store token in API singleton object
      api.setToken(token)

      // Trigger change of user authentication status
      dispatch({
        type: actions.UPDATE_AUTHENTICATION,
        authenticated: true,
      });
    });
  };

export const logout = () =>
  (dispatch: Function, getState: Function) => {
    // Remove token from API singleton object
    api.removeToken();

    // Trigger change of user authentication status
    dispatch({
      type: actions.UPDATE_AUTHENTICATION,
      authenticated: false,
    });

    auth.logout();
  };

export const syncUser = () =>
  async (dispatch: Function, getState: Function) => {
    const user = await api.getUser();
    // Probably user needs to be completed with some properties here
    dispatch({ type: actions.UPDATE_USER, user });
  };

export const isUserAuthenticated = () =>
  (dispatch: Function, getState: Function) => {
    return auth.isAuthenticated();
  };
