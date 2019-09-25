import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';
// Components
import Dashboard from './components/dashboard/connected';
import Menu from './components/menu/Menu';
import Turns from './components/turns/connected';
// Styles


const mapStateToAppProps = (state, props) => Object.assign({}, state, props);

const mapDispatchToAppProps = (dispatch) =>
  bindActionCreators({ }, dispatch);

class BaristaApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='seven wide column'>
        <div className='column'>
          <Dashboard />  // Here we could decide what to render, barista or customer
          <Menu />
          <Turns />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(BaristaApp);
