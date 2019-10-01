import Requester from './requester';
import Brand from './brand';
import User from './user';

class API {
  constructor({ protocol, host, port, token, version }) {
    this._requester = new Requester({ protocol, host, port, token, version });
  }

  get requester() {
    return this._requester;
  }

  setToken(token) {
    this._requester.setToken(token);
  }

  removeToken() {
    this._requester.setToken(null);
  }

  getUser(userId) {
    const path = this._buildUserPath(userId);
    return this._requester.get(path)
      .then(response => new User(response, this._requester));
  }

  getBrands() {
    const path = this._buildBrandsPath();
    const response = this._requester.get(path);

    return new Brand(response, this._requester);
  }

  getBrand(brandId) {
    const path = this._buildBrandPath(brandId);
    const response = this._requester.get(path);

    return new Brand(response, this._requester);
  }

  _buildBrandsPath() {
    return '/brands';
  }

  _buildBrandPath(brandId) {
    return `/brands/${brandId}`
  }

  _buildUserPath(userId) {
    return `/users/${userId}`;
  }
}

class Singleton {
  constructor(params) {
    if (!Singleton.instance) {
      Singleton.instance = new API(params);
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}


export default Singleton;
