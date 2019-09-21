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

class CustomerApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  cardStyle = {
    width: '200px',
  };

  render() {
    return (
      <div className='twelve wide column' style={{ paddingRight: 0 }}>
        <div className='column'>

          <div class="ui cards">
            <div class="card" style={ this.cardStyle }>
              <div class="image">
                <img src='/mutuo_lobby.jpg'/>
              </div>
              <div className="content">
                <a className="header">
                  Mutuo Hidalgo
                </a>
                <div class="meta">
                  <a>Lobby</a>
                  <span class="right floated">
                    <span style={{ marginLeft: '4px' }}>6</span>
                    <i class="ticket alternate right icon"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="card" style={ this.cardStyle }>
              <div class="image">
                <img src='/mutuo_rooftop.jpg'/>
              </div>
              <div className="content">
                <a className="header">
                  Mutuo Hidalgo
                </a>
                <div class="meta">
                  <a>Roof Top</a>
                  <span class="right floated">
                    <span style={{ marginLeft: '4px' }}>23</span>
                    <i class="ticket alternate right icon"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="card" style={ this.cardStyle }>
              <div class="image">
                <img style={{ height: '125px' }} src='/terrible_juan_wizeline.jpg'/>
              </div>
              <div className="content">
                <a className="header">
                  El Terrible Juan
                </a>
                <div class="meta">
                  <a>Wizeline</a>
                  <span class="right floated">
                    <span style={{ marginLeft: '4px' }}>23</span>
                    <i class="ticket alternate right icon"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToAppProps, mapDispatchToAppProps)(CustomerApp);
