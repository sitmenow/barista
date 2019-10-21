import Auth from './index';


export default class Dummy extends Auth {
  constructor({ profile }) {
    super();

    this._accessToken = 'ACCESS_TOKEN';
    this._idToken = 'ID_TOKEN';
    this._expiresAt = 'NEVER';
    this._logoutRedirection = '/';
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
    return true;
  }

  setSession(authResult) {
  }

  renewSession() {
  }

  getUserProfile(cb) {
    cb(this._accessToken, this._profile);
  }
}
