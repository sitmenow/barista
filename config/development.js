module.exports = {
  api: {
    protocol: 'http',
    host: 'localhost',
    port: '8080',
    version: 'v1',
  },
  auth: {
    adapter: 'auth0',
    domain: 'sitmenow.auth0.com',
    clientID: '2c3q1IpRx9mCO8Mjl7bD1Md7uQcJ2wZg',
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token',
    scope: 'openid profile',
    audience: 'https://coffee-shop.sitmenow.com',
  },
};
