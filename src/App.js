import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// import logo from './logo.svg';
import './App.css';
import './semantic/dist/semantic.css';

import Header from './components/Header';
import Menu from './components/Menu';
import TurnsList from './TurnsList';
import API from './api/client';
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
    lastOpeningTime: new Date(),
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

    this.api = new API(props.branchId, props.baristaId);
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());

    this.loadBranch();
    this.loadProfile();
    this.loadTurns();
  }

  openBranch = () => {
    this.setState({ lastOpeningTime: new Date() });
  }

  loadBranch = () => {
    const branch = {
      id: 'a2242d74-174d-4e41-976b-6456423a2ffb',
      lastOpeningTime: new Date(),
    };

    store.dispatch(setBranch(branch));
  }

  loadProfile = () => {
    const barista = {
      id: 'a2242d74-174d-4e41-976b-6456423a2ffc',
      name: 'Gerardo Reyes',
      role: 'Barista',
    };

    store.dispatch(setBarista(barista));
  }

  loadTurns = () => {
    const turns = [
      {
        id: 'a2242d74-174d-4e41-976b-6456423a2ffa',
        name: 'Emmanuel Diaz',
        company: 'Scalable Press',
        companyShortName: 'SP',
        product: 'Latte caliente deslactosada',
        requestedTime: new Date(),
        status: 'pending',
        color: 'blue',
      },
      {
        id: 'fb52256a-5d61-48e5-bd86-70f6e45779e8',
        name: 'Abraham Lopez',
        company: '100 Ladrillos',
        companyShortName: '100L',
        product: 'Expresso cortado doble',
        requestedTime: new Date(),
        status: 'pending',
        color: 'red',
      },
      {
        id: 'fb52256a-5d61-48e5-bd86-70f6e45779e0',
        name: 'David Aguinaga',
        company: 'Envato',
        companyShortName: 'ENV',
        product: 'Chai frio deslactosada',
        requestedTime: new Date(),
        status: 'pending',
        color: 'red',
      },
      {
        id: 'fb52256a-5d61-48e5-bd86-70f6e45779e1',
        name: 'Armando Rodriguez',
        company: 'Envato',
        companyShortName: 'ENV',
        product: 'Chocolate caliente',
        requestedTime: new Date(),
        status: 'pending',
        color: 'red',
      },
      {
        id: 'fb52256a-5d61-48e5-bd86-70f6e45779e6',
        name: 'Raul Lopez Lopez',
        company: '100 Ladrillos',
        companyShortName: '100L',
        product: 'Americano doble',
        requestedTime: new Date(),
        status: 'pending',
        color: 'red',
      },
      {
        id: 'fb52256a-5d61-48e5-bd86-70f6e45779a6',
        name: 'Alejandro Valenzuela',
        company: 'Billpocket',
        companyShortName: 'BP',
        product: 'Tizana menta + phur fria',
        requestedTime: new Date(),
        status: 'pending',
        color: 'red',
      },
    ];

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
