import Brand from './brand';
import Turn from './turn';

class Branch {
  constructor(response = {}, requester) {
    this.id = response._id;
    this.name = response._name;
    this.lastOpeningTime = response._lastOpeningTime;
    this.brand = new Brand(response._brand);
    this._requester = requester;
  }

  async turns() {
    const path = `/brands/${this.brand.id}/branches/${this.id}/turns`;
    const response = await this._requester.get(path);

    return response
      .map(turn => new Turn(turn, this._requester));
  }

  async turn(turnId) {
    const path = `/brands/${this.brand.id}/branches/${this.id}/turns/${turnId}`;
    const response = await this._requester.get(path);

    return new Branch(response, this._requester);
  }

  async open() {}

  async close() {}
}

export default Branch;
