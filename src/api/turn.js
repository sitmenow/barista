import Branch from './branch';

class Turn {
  constructor({ id, name, requestedTime, metadata, branch } = {}, requester) {
    const { company, product } = metadata || {};
    this.id = id;
    this.name = name;
    this.requestedTime = requestedTime;
    this.company = company;
    this.product = product;
    this.branch = branch;
    this._requester = requester;
  }

  serve() {
    const path = this._buildServeTurnPath();
    return this._requester.put(path)
      .then(response => new Turn(response, this._requester));
  }

  reject() {
    const path = this._buildRejectTurnPath();
    return this._requester.put(path)
      .then(response => new Turn(response, this._requester));
  }

  prepare() {
    const path = this._buildPrepareTurnPath();
    return this._requester.put(path)
      .then(response => new Turn(response, this._requester));
  }

  unprepare() {
    const path = this._buildUnprepareTurnPath();
    return this._requester.put(path)
      .then(response => new Turn(response, this._requester));
  }

  cancel () {
    const path = this._buildCancelTurnPath();
    return this._requester.put(path)
      .then(response => new Turn(response, this._requester));
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

  _buildCancelTurnPath() {
    return `/brands/${this.branch.brand.id}/branches/${this.branch.id}/turns/${this.id}/cancel`;
  }

}

export default Turn;
