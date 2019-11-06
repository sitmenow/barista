import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Menu extends React.Component {
  static ProfileOption = ({ isSelected, onClick }) => (
    <a className={ Menu.getItemClass(isSelected) } onClick={ onClick } >
      Profile
    </a>
  );

  static VenuesOption = ({ isSelected, onClick }) => (
    <a className={ Menu.getItemClass(isSelected) } onClick={ onClick } >
      Venues
    </a>
  );

  static OrganizationsOption = ({ isSelected, onClick }) => (
    <a className={ Menu.getItemClass(isSelected) } onClick={ onClick } >
      Organizations
    </a>
  );

  static TurnsOption = ({ isSelected, onClick, turns }) => (
    <a className={ Menu.getItemClass(isSelected) } onClick={ onClick } >
      Turns
      <div className="ui left pointing label" style={ Menu.getMenuPointingLabelStyle() }>
        { turns.length && turns.length }
      </div>
    </a>
  );


  topCardStyle = {
    border: 'none',
    boxShadow: 'none',
    margin: 0,
    padding: '0.5em 0 1em 0',
  };

  menuStyle = {
    borderRadius: '2px',
    margin: 0,
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

  static getMenuPointingLabelStyle = () => ({
    background: 'rgb(64, 60, 60)',
  });

  static getItemClass = (isActive) => {
    let klass = 'item';

    if (isActive) {
      return klass + ' active';
    }

    return klass;
  }

  render() {
    return (
      <div className='computer tablet only four wide tablet three wide computer column' style={{ borderRight: '1px solid #1313210f' }}>
        <div className='column'>
          <div style={ this.topCardStyle } className='ui fluid segment'>
            <div className="content" style={{ textAlign: 'center' }}>
              <img className="ui avatar image"
                   style={ this.imageLogoStyle }
                   src="/coffee-outline-filled.png" />
            </div>
          </div>

          <div style={ this.menuStyle } className="ui fluid vertical menu">
            {
              this.props.profileOptionOnClick &&
                <Menu.ProfileOption
                  isSelected={ this.props.isProfileOptionSelected }
                  onClick={ this.props.profileOptionOnClick }
                />
            }

            {
              this.props.organizationsOptionOnClick &&
                <Menu.OrganizationsOption
                  isSelected={ this.props.isOrganizationsOptionSelected }
                  onClick={ this.props.organizationsOptionOnClick }
                />
            }

            {
              this.props.venuesOptionOnClick &&
                <Menu.VenuesOption
                  isSelected={ this.props.isVenuesOptionSelected }
                  onClick={ this.props.venuesOptionOnClick }
                />
            }

            {
              this.props.turnsOptionOnClick &&
                <Menu.TurnsOption
                  isSelected={ this.props.isTurnsOptionSelected }
                  onClick={ this.props.turnsOptionOnClick }
                  turns={ this.props.turns }
                />
            }
          </div>
        </div>
      </div>
    );
  }
}


export default Menu;
