import Branch from './branch';

class Turn {
  constructor(response = {}, requester) {
    this.id = response._id;
    this.name = response.name;
    this.requestedTime = response._requestedTime;
    this.company = response._metadata.company;
    this.product = response._metadata.product;
    this.branch = new Branch(response._branch);
    this._requester = requester;
  }

  serve() {}

  reject() {}

  prepare() {}
}

export default Turn;
