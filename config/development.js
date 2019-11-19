module.exports = {
  api: {
    protocol: 'http',
    host: 'localhost',
    port: '8080',
    version: 'v1',
  },
  auth: {
    adapter: 'auth0',
    domain: 'drinqueue.auth0.com',
    clientID: 'LTC1V2xPqPaRP8rR5lpQnk4y4lqMvBMy',
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token',
    scope: 'openid profile',
    audience: 'https://api.drinqueue.com',
  },
};
