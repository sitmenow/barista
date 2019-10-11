import React from 'react';

class Menu extends React.Component {
  itemStyle = {
    width: '50%',
    display: 'block',
    textAlign: 'center',
  };

  render() {
    return (
      <div className="ui pointing menu">
        <a style={ this.itemStyle } className="item active">
          Active
        </a>
        <a style={ this.itemStyle } className="item">
          Completed
        </a>
      </div>
    );
  }
}

export default Menu;
