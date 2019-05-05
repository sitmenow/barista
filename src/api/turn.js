import Branch from './branch';

class Turn {
  constructor({ _id, name, _requestedTime, _metadata, _branch } = {}, requester) {
    this.id = _id;
    this.name = name;
    this.requestedTime = _requestedTime;
    this.company = _metadata.company;
    this.product = _metadata.product;
    this.branch = new Branch(_branch);
    this._requester = requester;
  }

  async serve() {
    const path = this._buildServeTurnPath();
    const response = await this._requester.put(path);
  }

  async reject() {
    const path = this._buildRejectTurnPath();
    const response = await this._requester.put(path);
  }

  prepare() {}

  _buildServeTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/serve`;
  }

  _buildRejectTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/reject`;
  }
}

export default Turn;
