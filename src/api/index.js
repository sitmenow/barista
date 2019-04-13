import Requester from './requester';
import Brand from './brand';

class API {
  constructor({ protocol, host, port, token, version }) {
    this._requester = new Requester({ protocol, host, port, token, version });
  }

  async brands() {
    const path = '/brands';
    const response = await this._requester.get(path);

    return new Brand(response, this._requester);
  }

  async brand(brandId) {
    const path = `/brands/${brandId}`;
    const response = await this._requester.get(path);

    return new Brand(response, this._requester);
  }
}

export default API;
