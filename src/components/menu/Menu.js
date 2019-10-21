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
      <div className='four wide column menu'>
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
