import React from 'react';

// import logo from './logo.svg';
import './App.css';
import '../../semantic/dist/semantic.css';

import Dashboard from '../dashboard/connected';
import Menu from '../menu/Menu';
import Turns from '../turns/connected';

class App extends React.Component {
  componentDidMount() {
    // store.subscribe(() => this.forceUpdate());
  }

  containerStyle = {
    margin: '20px',
  }

  columnStyle = {
    maxWidth: '480px',
    minWidth: '420px',
  }

  render() {
    return (
      <div style={ this.containerStyle } className='ui two column centered grid'>
        <div style={ this.columnStyle } className='column'>
          <Dashboard />
          <Menu />
          <Turns />
        </div>
      </div>
    );
  }
}

export default App;
