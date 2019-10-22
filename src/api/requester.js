class RequestError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
  }
}

class Requester {
  constructor({ protocol, host, port, token, version }) {
    this._host = host;
    this._port = port;
    this._token = token;
    this._protocol = protocol;
    this._version = version;
  }

  setToken(token) {
    this._token = token;
  }

  get(path, query = '') {
    return this._request(path + query, 'GET');
  }

  post(path, body) {
    return this._request(path, 'POST', body);
  }

  put(path, body) {
    return this._request(path, 'PUT', body);
  }

  _request(path, method, body) {
    const baseUrl = this._buildBaseUrl();
    const url = `${baseUrl}${path}`
    const headers = {
      'Authorization': `Bearer ${this._token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    console.debug('Request: ', url, headers, body);

    const request = new Request(
      url,
      { method,
        headers,
        body: JSON.stringify(body),
      }
    );

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
            console.debug(response);
            return response.json()
              .then((body) => {
                  throw new RequestError(response.status, JSON.stringify(body));
              });
        }

        console.debug(response)
        return response.json();
      })
      .then(response => console.debug(response) || response)
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  _buildBaseUrl() {
    const portSuffix = this._port ? `:${this._port}` : '';
    return `${this._protocol}://${this._host}${portSuffix}/${this._version}`
  }
}

export default Requester;
