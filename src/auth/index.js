import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'sitmenow.auth0.com',
      clientID: '2c3q1IpRx9mCO8Mjl7bD1Md7uQcJ2wZg',
      redirectUri: 'http://localhost:3000/',
      responseType: 'token id_token',
      scope: 'openid profile read:turns',
      audience: 'https://coffee-shop.sitmenow.com',
    });

    this.accessToken = null;
    this.idToken = null;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: 'http://localhost:3000/'
    });

    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  handleAuthentication(history, cb) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.getProfile(cb);
        history.replace('/');
        return;
      }

      if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }

      this.login();
    });
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the Access Token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

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


  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (err) {
        return;
      }

      cb(this.idToken, profile);
    });
  }
}
