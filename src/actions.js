import AuthFactory from './auth/factory';
import API from './api';
import User from './api/user';
import { actions } from './reducer';

const config = process.env.NODE_CONFIG ? JSON.parse(process.env.NODE_CONFIG) : {
  api: {
    protocol: 'https',
    host: 'sitmenow.herokuapp.com',
    port: null,
    version: 'v1',
  },
  auth: {
    adapter: 'auth0',
    domain: 'drinqueue.auth0.com',
    clientID: 'LTC1V2xPqPaRP8rR5lpQnk4y4lqMvBMy',
    redirectUri: 'https://drinqueue.com/',
    responseType: 'token id_token',
    scope: 'openid email profile',
    audience: 'https://api.drinqueue.com',
  },
};

// TODO: Handle error as setup error
// TODO: Any unauthorized api call should dispatch a logout
const api = new API(config.api).getInstance();
const auth = new AuthFactory.create(config.auth);

function notifyMe() {
  var notification = new Notification("Hi there!");
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

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

    const ws = new WebSocket('ws://localhost:8080/ws/' + user.id);    // event emmited when connected
    ws.onmessage = function (ev) {
      console.log(ev);
      notifyMe(ev.data);
    }
    ws.onopen = function() {
      console.log(ws);
    }

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

