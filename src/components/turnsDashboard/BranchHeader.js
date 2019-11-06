import React from 'react';

import { dateToString } from '../../helpers/datetime'


class BranchHeader extends React.Component {
  state = {
    isMenuEnabled: false,
  };

  enableMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  };

  getDropdownClass = () => {
    if (this.state.showMenu) {
      return 'menu transition visible';
    }

    return 'menu';
  };

  render() {
    const { name, picture, brand } = this.props;

    return (
      <>
        <div className='ui grid' style={{ marginTop: 0, marginBottom: 0 }}>
          <div className="five wide computer five wide tablet ten wide mobile column" style={{ paddingTop: '0' }}>
            <div className="ui fluid card" style={{ boxShadow: 'none' }}>
              <div className="content" style={{ padding: '0' }}>
                <div className="header">{ brand.name }</div>
                <div className="meta">{ name }</div>
              </div>
            </div>
          </div>
          <div className='six wide computer six wide tablet six wide mobile column' style={{ paddingTop: '0' }}>
            <img className='ui tiny circle image' style={{ margin: 'auto' }} src={ brand.picture } />
          </div>
          <div className='tablet computer only five wide computer five wide tablet column' style={{ paddingTop: '0' }}>
            <div className="ui right floated left labeled tiny button" tabIndex="0">
              <a className="ui label" style={{ background: 'rgb(64, 60, 60)', color: 'white' }}>
                16 min
              </a>
              <div className="ui icon primary tiny button" style={{ background: '#de604f', cursor: 'pointer' }} onClick={ this.props.createTurnButtonOnClick }>
                Create Turn
              </div>
            </div>
          </div>
          <div className='mobile only fifteen wide mobile column' style={{ paddingTop: '0', marginTop: '-42px' }}>
            <div className="ui left labeled tiny button" tabIndex="0">
              <a className="ui label" style={{ background: 'rgb(64, 60, 60)', color: 'white' }}>
                16 min
              </a>
              <div className="ui icon primary tiny button" style={{ background: '#de604f', cursor: 'pointer' }} onClick={ this.props.createTurnButtonOnClick }>
                Create Turn
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default BranchHeader;
