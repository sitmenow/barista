import Requester from './requester';
import Brand from './brand';

class API {
  constructor({ protocol, host, port, token, version }) {
    this._requester = new Requester({ protocol, host, port, token, version });
  }

  async getBrands() {
    const path = this._buildBrandsPath();
    const response = await this._requester.get(path);

    return new Brand(response, this._requester);
  }

  async getBrand(brandId) {
    const path = this._buildBrandPath(brandId);
    const response = await this._requester.get(path);

    return new Brand(response, this._requester);
  }

  brand(params) {
    return new Brand(params, this._requester);
  }

  _buildBrandsPath() {
    return '/brands';
  }

  _buildBrandPath(brandId) {
    return `/brands/${brandId}`
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
