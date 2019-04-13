import Branch from './branch';

class Brand {
  constructor(response = {}, requester) {
    this.id = response._id;
    this.name = response._name;
    this._requester = requester;
  }

  async branches() {
    const path = `/brands/{$this.id}/branches`;
    const response = await this._requester.get(path);

    return response
      .map(branch => new Branch(branch, this._requester));
  }

  async branch(branchId) {
    const path = `/brands/${this.id}/branches/${branchId}`;
    const response = await this._requester.get(path);

    return new Branch(response, this._requester);
  }
}

export default Brand;
