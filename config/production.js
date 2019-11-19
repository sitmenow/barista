module.exports = {
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
    scope: 'openid profile',
    audience: 'https://api.drinqueue.com',
  },
};
