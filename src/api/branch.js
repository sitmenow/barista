import Brand from './brand';
import Turn from './turn';

class Branch {
  constructor({ _id, _name, _lastOpeningTime, _brand } = {}, requester) {
    this.id = _id;
    this.name = _name;
    this.lastOpeningTime = _lastOpeningTime;
    this.brand = new Brand(_brand);
    this._requester = requester;
  }

  async turns() {
    const path = this._buildTurnsPath();
    const response = await this._requester.get(path);

    return response
      .map(turn => new Turn(turn, this._requester));
  }

  async turn(turnId) {
    const path = this._buildTurnPath(turnId);
    const response = await this._requester.get(path);

    return new Turn(response, this._requester);
  }

  async open() {}

  async close() {}

  turn(params) {
    return new Turn(params, this._requester)
  }

  _buildTurnsPath() {
    return `/brands/${this.brand.id}/branches/${this.id}/turns`;
  }

  _buildTurnPath(turnId) {
    return `/brands/${this.brand.id}/branches/${this.id}/turns/${turnId}`;
  }
}

export default Branch;
