import Auth0 from './auth0';
import Dummy from './dummy';


const create = (config) => {
  let auth = null;

  switch(config.adapter) {
    case 'auth0':
      auth = new Auth0(config);
      break;
    case 'dummy':
    default:
      auth = new Dummy(config);
  }

  return auth;
};

export default { create };
