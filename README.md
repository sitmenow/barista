[![Netlify Status](https://api.netlify.com/api/v1/badges/ff3144c5-99c8-48f8-8bdf-ff5d21323671/deploy-status)](https://app.netlify.com/sites/smn-barista/deploys)

# Barista
Sit Me Now web app to automate waiting lists at free coffee bars.

## Setup

### Requirements
Install nodejs + yarn:
```bash
$ brew install nodeenv
$ brew install yarn --without-node

$ nodeenv /path/to/your/envs/node
$ source /path/to/your/envs/node/bin/activate
$ cd /path/to/waitress/repo/path

$ yarn install
```

### Enable development config
  1. Globaly install `config` module:
  ```
  $ npm install -g config
  ```
  2. Under the local `node_modules` directory, look for the `react-scripts/config/env.js` file
  3. Import config module:
  ```
  const config = require('config');
  ```
  4. Add `NODE_CONFIG` in the base reduce values inside `getClientEnvironment` function:
  ```
  NODE_CONFIG: JSON.stringify(config),
  ```

### Run
```
  yarn start
```

This project was bootstrapped with [Create React App](https://github.com/sitmenow/barista/CRA.md).
