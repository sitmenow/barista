import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// import logo from './logo.svg';
import './App.css';
import './semantic/dist/semantic.css';

import Header from './components/Header';
import Menu from './components/Menu';
import TurnsList from './TurnsList';
import API from './api';
import { branchReducer, baristaReducer, turnsReducer } from './reducers';
import { setBranch, setBarista, setTurns } from './actions';

const reducer = combineReducers({
  branch: branchReducer,
  barista: baristaReducer,
  turns: turnsReducer,
});

const initialState = {
  branch: {
    id: null,
    name: null,
    logo: null,
    lastOpeningTime: null,
  },
  barista: {
    id: null,
    name: null,
    role: null,
    isPreparing: false,
  },
  turns: [],
};

const store = createStore(reducer, initialState);

class App extends React.Component {
  constructor(props) {
    super(props);

    // The following parameters should come from configuration
    this._api = new API({
      protocol: 'http',
      host: 'localhost',
      port: 8080,
      token: null,
      version: 'v1',
    });
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());

    this.load();
  }

  openBranch = () => {
    // this._branch.open();
    this.setState({ lastOpeningTime: new Date() });
  }

  closeBranch = () => {
    // this._branch.close();
  }

  load = async () => {
    await this.loadBranch();
    await this.loadBarista();
    await this.loadTurns();
  }

  loadBranch = async () => {
    this._brand = await this._api.brand('brand-test');
    this._branch = await this._brand.branch('branch-test')
    store.dispatch(setBranch(this._branch));
  }

  loadBarista = async () => {
    const barista = {
      id: 'a2242d74-174d-4e41-976b-6456423a2ffc',
      name: 'Gerardo Reyes',
      role: 'Barista',
    };
    store.dispatch(setBarista(barista));
  }

  loadTurns = async () => {
    const turns = await this._branch.turns();
    store.dispatch(setTurns(turns));
  }

  handlePrepareFormSubmit = () => {}

  handleServeFormSubmit = () => {}

  handleRejectFormSubmit = () => {}

  containerStyle = {
    margin: '20px',
  }

  columnStyle = {
    maxWidth: '480px',
    minWidth: '420px',
  }

  render() {
    const { branch, barista } = store.getState();

    return (
      <div style={ this.containerStyle } className='ui two column centered grid'>
        <div style={ this.columnStyle } className='column'>
          <Provider store={ store }>
            <Header branch={ branch } barista={ barista } />
            <Menu />
            <TurnsList />
         </Provider>
        </div>
      </div>
    );
  }
}

export default App;
