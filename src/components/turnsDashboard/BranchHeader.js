import React from 'react';

import { dateToString } from '../../helpers/datetime'

class BranchHeader extends React.Component {
  state = {
    showMenu: false,
  };

  leftLabelStyle = {
    marginTop: '1em',
    background: 'rgb(242, 242, 242)',
    color: '#403c3c',
    margin: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  rightLabelStyle = {
    color: 'rgb(242, 242, 242)',
    background: '#403c3c',
    margin: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  handleDropdownChange = () => {
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
        <div className='ui fluid card'>
          <div className="content">
            <div className="ui right floated dropdown" onClick={ () => this.handleDropdownChange() }>
              <i className="caret down icon"></i>
              <div className={ this.getDropdownClass() }>
                <div className="item" onClick={ () => this.props.showTurnForm() }>New Turn</div>
              </div>
            </div>
            <div className='left floated tiny ui image' style={{ marginBottom: 0 }}>
              <img src={ brand.picture } />
            </div>
            <div className="header">{ brand.name }</div>
            <div className="meta">{ name }</div>
            <div className="left floated" style={{ marginTop: '1em' }}>
              <div className="ui label" style={ this.leftLabelStyle }>
                Open
              </div>
              <div className="ui label" style={ this.rightLabelStyle }>
                8 min
              </div>
            </div>

            {/*
            <div className="description">
              Coffee Shop
            </div>
            */}
          </div>
        </div>

        {/*
        <span className="ui horizontal divider" style={{ color: 'rgba(0, 0, 0, 0.4)', fontWeight: 'lighter' }}>
          X min
        </span>
        */}
      </>
    );
  }
}


export default BranchHeader;
