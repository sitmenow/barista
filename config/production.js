module.exports = {
  api: {
    protocol: 'https',
    host: 'sitmenow.herokuapp.com',
    port: null,
    version: 'v1',
  },
  auth: {
    adapter: 'auth0',
    domain: 'sitmenow.auth0.com',
    clientID: '2c3q1IpRx9mCO8Mjl7bD1Md7uQcJ2wZg',
    redirectUri: 'https://smn.grevych.com/',
    responseType: 'token id_token',
    scope: 'openid profile',
    audience: 'https://coffee-shop.sitmenow.com',
  },
};
