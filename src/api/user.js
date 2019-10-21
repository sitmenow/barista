import Turn from './turn';

class User {
  constructor({ id, name, email, picture } = {}, requester) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this._requester = requester;
  }

  register() {
    const path = this._buildRegisterUserPath();
    return this._requester.post(
      path,
      {
        name: this.name,
        email: this.email,
        picture: this.picture,
      })
      .then(response => new User(response, this._requester));
  }

  getRoles() {
    const path = this._buildGetUserRolesPath();
    return this._requester.get(path);
  }

  // TODO: Rename this function to getActiveTurns
  getTurns() {
    const path = this._buildGetTurns();
    return this._requester.get(path)
      .then(response => response.map(turn => new Turn(turn, this._requester)));
  }

  _buildRegisterUserPath() {
    return '/users';
  }

  _buildGetUserRolesPath() {
    return `/users/${this.id}/roles`;
  }

  _buildGetTurns() {
    return `/users/${this.id}/turns?status=active`;
  }
}

export default User;
