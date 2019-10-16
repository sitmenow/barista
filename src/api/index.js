import Requester from './requester';
import Brand from './brand';
import Branch from './branch';
import User from './user';


// TODO: Create factory for future different versions
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

  getBranches() {
    const path = this._buildBranchesPath();
    return this._requester.get(path)
      .then(response =>
        response.map((branch) => {
          const brand = new Brand(branch.brand, this._requester);
          Object.assign(branch, { brand });
          return new Branch(branch, this._requester)
        })
      );
  }

  getBrands() {
    const path = this._buildBrandsPath();
    return this._requester.get(path)
      .then(response =>
        response.map(brand => new Brand(brand, this._requester))
      );
  }

  getBrand(brandId) {
    const path = this._buildBrandPath(brandId);
    return this._requester.get(path)
      .then(response => new Brand(response, this._requester));
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

  _buildBranchesPath() {
    return '/branches';
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
