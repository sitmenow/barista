import Branch from './branch';

class Brand {
  constructor({ _id, _name } = {}, requester) {
    this.id = _id;
    this.name = _name;
    this._requester = requester;
  }

  async getBranches() {
    const path = this._buildBranchesPath();
    const response = await this._requester.get(path);

    return response
      .map(branch => new Branch(branch, this._requester));
  }

  async getBranch(branchId) {
    const path = this._buildBranchPath(branchId);
    const response = await this._requester.get(path);

    return new Branch(response, this._requester);
  }

  branch(params) {
    return new Branch(params, this._requester);
  }

  _buildBranchesPath() {
    return `/brands/${this.id}/branches`;
  }

  _buildBranchPath(branchId) {
    return `/brands/${this.id}/branches/${branchId}`;
  }
}

export default Brand;
