import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Menu extends React.Component {
  state = {
    isTurnsOptionSelected: false,
    isVenuesOptionSelected: true,
  };

  topCardStyle = {
    backgroundColor: 'rgb(64, 60, 60)',
    color: '#AAA',
  };

  imageLogoStyle = {
    // marginTop: '-10px',
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

  getItemClass = (isActive) => {
    let klass = 'item';

    if (isActive) {
      return klass + ' active';
    }

    return klass;
  }

  handleTurnsOptionSelection = () => {
    this.setState({
      isTurnsOptionSelected: true,
      isVenuesOptionSelected: false,
    });
  };

  handleVenuesOptionSelection = () => {
    this.props.cleanSelectedBranch();

    this.setState({
      isTurnsOptionSelected: false,
      isVenuesOptionSelected: true,
    });
  };

  render() {
    {/*
      Options:
       - Log Out
       - Go to Admin Dashboard
       - Go to Barista Dashboard

       Additionals:
        - Turn notification card
    */}

    {/*
      Customer:
       - Turns
       - Venues

      Admin:
       - Brands/Organizations
          - Create Organization
       - Venues

      Barista:
       - Turns
       - Venues
    */}

    return (
      <div className='four wide column'>
        <div className='column'>

          <div style={ this.topCardStyle } className='ui fluid card'>
            <div className="content">
              <div className="ui fluid dropdown item" style={{ textAlign: 'center' }}>
                <img className="ui avatar image"
                     style={ this.imageLogoStyle }
                     src="/coffee-outline-filled.png" />
                {/*
                <span className="ui header" style={ this.textLogoStyle }>
                  Barista
                </span>
                <i className="ui right dropdown icon" style={ this.dropdownIconStyle }></i>
                */}
                <div className="menu">
                  <div className="item">Applications</div>
                  <div className="item">International Students</div>
                  <div className="item">Scholarships</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ui fluid vertical menu">
            <Link to={'/'} className={ this.getItemClass(false) }>
              Profile
            </Link>
            <Link to={'/turns'}
                  className={ this.getItemClass(this.state.isTurnsOptionSelected) }
                  onClick={ () => this.handleTurnsOptionSelection() }
            >
              Turns
              { this.props.unreadNotifications &&
                <div className="ui left pointing label" style={ this.menuPointingLabelStyle }>
                  1
                </div>
              }
            </Link>
            <Link to={'/'}
                  className={ this.getItemClass(this.state.isVenuesOptionSelected) }
                  onClick={ () => this.handleVenuesOptionSelection() }
            >
              Venues
            </Link>

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


export default Menu;
