// import AuthFactory from './auth/factory';
import Auth0 from './auth/auth0';
import API from './api';
import User from './api/user';
import { actions } from './reducer';


// TODO: Take this from env
new API({
  protocol: 'https',
  host: 'sitmenow.herokuapp.com',
  port: null,
  version: 'v1',
})

// Any unauthorized api call should dispatch a logout
const api = new API().getInstance();

// TODO: Handle error as setup error
// const auth = AuthFactory.create(config.auth);
const auth = new Auth0({
  domain: 'sitmenow.auth0.com',
  clientID: '2c3q1IpRx9mCO8Mjl7bD1Md7uQcJ2wZg',
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile read:turns',
  audience: 'https://coffee-shop.sitmenow.com',
});

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

