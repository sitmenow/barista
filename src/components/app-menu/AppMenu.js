import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';


const mapStateToAppMenuProps = (state) => {
  return {};
};

const mapDispatchToAppMenuProps = (dispatch) =>
  bindActionCreators({}, dispatch);

const mergeAppMenuProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

class AppMenu extends React.Component {

  topCardStyle = {
    backgroundColor: 'rgb(64, 60, 60)',
    color: '#AAA',
  };

  imageLogoStyle = {
    marginTop: '-10px',
    marginRight: '6px',
  };

  textLogoStyle = {
    color: '#FFF',
    display: 'inline',
    margin: 0,
  };

  dropdownIconStyle = {
    color: '#FFF',
    marginRight: '1em',
    marginTop: '6px',
  };

  menuPointingLabelStyle = {
    background: 'rgb(64, 60, 60)',
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className='four wide column'>
        <div className='column'>

          <div style={ this.topCardStyle } className='ui fluid card'>
            <div className="content">
              <div className="ui fluid dropdown">
                {/*
                  Options:
                   - Log Out
                   - Go to Admin Dashboard
                   - Go to Barista Dashboard
                   - Profile
                   - Create Organization

                   Additionals:
                    - Turn notification card
                */}
                <img className="ui avatar image" style={ this.imageLogoStyle }
                     src="https://freeiconshop.com/wp-content/uploads/edd/coffee-outline-filled.png" />
                <span className="ui header" style={ this.textLogoStyle }>
                  Barista
                </span>
                <i className="right dropdown icon" style={ this.dropdownIconStyle }></i>
              </div>
            </div>
          </div>

          <div className="ui fluid vertical menu">
            {/*
              Customer:
               - Turns
               - Venues

              Admin:
               - Brands/Organizations
               - Venues

              Barista:
               - Turns
               - Venues
            */}
            <a className="active item">
              Turns
              <div className="ui left pointing label" style={ this.menuPointingLabelStyle }>
                1
              </div>
            </a>
            <a className="item">
              Venues
            </a>
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search venue..." />
                <i className="search icon"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}


export default connect(
  mapStateToAppMenuProps,
  mapDispatchToAppMenuProps,
  // mergeTurnsProps,
)(AppMenu);
