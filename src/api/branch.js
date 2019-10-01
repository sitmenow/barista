import Brand from './brand';
import Turn from './turn';

class Branch {
  constructor({ id, name, lastOpeningTime, brand } = {}, requester) {
    this.id = id;
    this.name = name;
    this.lastOpeningTime = lastOpeningTime;
    this.brand = brand;
    this._requester = requester;
  }

  async getTurns() {
    const path = this._buildTurnsPath();
    const response = await this._requester.get(path);

    return response
      .map(turn => new Turn(turn, this._requester));
  }

  async getTurn(turnId) {
    const path = this._buildTurnPath(turnId);
    const response = await this._requester.get(path);

    return new Turn(response, this._requester);
  }

  createTurn(turn, role = '') {
    console.log(turn);
    const path = this._buildCreateTurn(role);
    return this._requester.post(path, turn)
      .then(response => new Turn(response, this._requester));
  }

  async open() {}

  async close() {}

  _buildTurnsPath() {
    return `/brands/${this.brand.id}/branches/${this.id}/turns`;
  }

  _buildTurnPath(turnId) {
    return `/brands/${this.brand.id}/branches/${this.id}/turns/${turnId}`;
  }

  _buildCreateTurn(role) {
    return `/brands/${this.brand.id}/branches/${this.id}/turns?role=${role}`;
  }
}

export default Branch;
