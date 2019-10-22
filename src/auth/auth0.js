import auth0 from 'auth0-js';

import Auth from './index';


export default class Auth0 extends Auth {
  constructor({
    domain, clientID, redirectUri, responseType, scope, audience,
  }) {
    super();

    this._auth0 = new auth0.WebAuth({
      domain: 'sitmenow.auth0.com',
      clientID: '2c3q1IpRx9mCO8Mjl7bD1Md7uQcJ2wZg',
      redirectUri: 'https://smn.grevych.com',
      responseType: 'token id_token',
      scope: 'openid profile',
      audience: 'https://coffee-shop.sitmenow.com',
    });


    this._accessToken = localStorage.getItem('accessToken', null);
    this._idToken = localStorage.getItem('idToken', null);
    this._expiresAt = localStorage.getItem('expiresAt', 0);
    this._logoutRedirection = 'https://smn-barista.netlify.com';
  }

  get accessToken() {
    return this._accessToken;
  }

  get idToken() {
    return this._idToken;
  }

  login(hash, history, cb) {
    if (/access_token|id_token|error/.test(hash)) {
      this._auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.getUserProfile(cb);
          // TODO: Save last URL visited
          history.replace('/');
          return;
        }

        if (err) {
          alert(JSON.stringify(err));
          this.logout();
        }

      });
    } else {
      this._auth0.authorize();
    }
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

    this._auth0.logout({
      returnTo: this._logoutRedirection,
    });

    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    console.debug('TOKEN EXPIRATION TIME: ', this._expiresAt);
    console.debug(
      'REMAINING TOKEN TIME: ',
      (this._expiresAt - new Date().getTime()) / 1000 / 60 / 60
    );
    return this._accessToken && new Date().getTime() < this._expiresAt;
  }

  setSession(authResult) {
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    // Set the time that the Access Token will expire at
    this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();


    localStorage.setItem('accessToken', this._accessToken);
    localStorage.setItem('idToken', this._idToken);
    localStorage.setItem('expiresAt', this._expiresAt)
    // navigate to the home route
    // history.replace('/home');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  getUserProfile(cb) {
    this._auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (err) return;

      cb(this._accessToken, profile);
    });
  }
}
