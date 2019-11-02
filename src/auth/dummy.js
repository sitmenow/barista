import Auth from './index';


export default class Dummy extends Auth {
  constructor({ accessToken, idToken, logoutRedirection, profile }) {
    super();

    this._accessToken = accessToken;
    this._idToken = idToken;
    this._expiresAt = 'NEVER';
    this._logoutRedirection = logoutRedirection;
    this._profile = profile;
  }

  get accessToken() {
    return this._accessToken;
  }

  get idToken() {
    return this._idToken;
  }

  login(a, b, cb) {
    this.getUserProfile(cb);
  }

  logout() {
    // Remove tokens and expiry time
    this._accessToken = null;
    this._idToken = null;
    this._expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');

    // navigate to the home route
    // history.replace(this._logoutRedirection);
  }

  isAuthenticated() {
    return false;
  }

  setSession(authResult) {
  }

  renewSession() {
  }

  getUserProfile(cb) {
    cb(this._accessToken, this._profile);
  }
}
