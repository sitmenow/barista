import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';


const mapStateToUserMenuProps = (state) => {
  return {};
};

const mapDispatchToUserMenuProps = (dispatch) =>
  bindActionCreators({}, dispatch);

const mergeUserMenuProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

class UserMenu extends React.Component {

  containerStyle = {
    // backgroundColor: 'rgb(145, 183, 216)',
    // borderRadius: '2px',
    // backgroundColor: '#484848',
    //backgroundColor: 'rgb(255, 116, 75)',
    // backgroundColor: 'rgb(255, 98, 52)',
    backgroundColor: 'rgb(64, 60, 60)',
    color: '#AAA',
  };

  imageStyle = {
  };

  cardStyle = {
    border: 0,
    margin: 0,
    width: 'auto',
    borderRadius: '0',
    boxShadow: '0 0',
  };

  contentStyle = {
    margin: 0,
    padding: '0 0 0 2em',
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className='four wide column'>
        <div className='column'>

          <div style={ this.containerStyle } className='ui fluid card'>
            <div class="content">
              <div class="ui fluid dropdown">
              <img class="ui avatar image" style={{ marginTop: '-10px', marginRight: '6px' }} src="https://freeiconshop.com/wp-content/uploads/edd/coffee-outline-filled.png" />
              <span class="ui header" style={{ color: '#FFF', display: 'inline', margin: 0 }}>Barista</span>
               <i class="right dropdown icon" style={{ color: '#FFF', marginRight: '1em', marginTop: '6px' }}></i>
            </div>
            </div>
          </div>

          <div class="ui fluid vertical menu">

            {/*
            <a class="active item" style={{ paddingTop: '0.8em', paddingBottom: '0.8em' }}>
              <img class="ui avatar image" style={{ marginRight: '0.8em' }} src="https://semantic-ui.com/images/avatar/large/elliot.jpg" />
              <span class="ui image">Gerardo Reyes</span>
              <div class="ui left pointing label" style={{ marginTop: '4px' }}>1</div>
            </a>
            */}

            <a class="active item">
              Turns
              <div class="ui left pointing label" style={{ background: 'rgb(64, 60, 60)'}}>1</div>
            </a>
            <a class="item">
              Venues
            </a>
            {/*
            <a class="item">
              Updates
              <div class="ui label">1</div>
            </a>
            */}
            <div class="item">
              <div class="ui transparent icon input">
                <input type="text" placeholder="Search venue..." />
                <i class="search icon"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}


export default connect(
  mapStateToUserMenuProps,
  mapDispatchToUserMenuProps,
  // mergeTurnsProps,
)(UserMenu);
