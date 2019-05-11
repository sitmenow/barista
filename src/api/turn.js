import Branch from './branch';

class Turn {
  constructor({ _id, name, _requestedTime, _metadata, _branch } = {}, requester) {
    const { company, product } = _metadata || {};
    this.id = _id;
    this.name = name;
    this.requestedTime = _requestedTime;
    this.company = company;
    this.product = product;
    this.branch = _branch;
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

  async prepare() {
    const path = this._buildPrepareTurnPath();
    const response = await this._requester.put(path);
  }

  async unprepare() {
    const path = this._buildUnprepareTurnPath();
    const response = await this._requester.put(path);
  }

  _buildServeTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/serve`;
  }

  _buildRejectTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/reject`;
  }

  _buildPrepareTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/prepare`;
  }

  _buildUnprepareTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/unprepare`;
  }
}

export default Turn;
