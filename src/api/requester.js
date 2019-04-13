class Requester {
  constructor({ protocol, host, port, token, version }) {
    this._host = host;
    this._port = port;
    this._token = token;
    this._protocol = protocol;
    this._version = version;
  }

  get(path, query = '') {
    return this._request(path + query, 'GET');
  }

  post(path, body) {
    return this._request(path, 'POST', body);
  }

  _request(path, method, body) {
    const baseUrl = this._buildBaseUrl();
    const url = `${baseUrl}${path}`
    console.log(`Request: ${url}`)

    const request = new Request(url, { method, body });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 && response.status >= 300) {
          throw new Error('Something went wrong on api server!');
        }

        return response.json();
      })
      .then(response => console.debug(response) || response)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  _buildBaseUrl() {
    return `${this._protocol}://${this._host}:${this._port}/${this._version}`
  }
}

export default Requester;
