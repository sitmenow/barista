import React from 'react';

class Menu extends React.Component {
  itemStyle = {
    width: '33.34%',
    display: 'block',
    textAlign: 'center',
  };

  render() {
    return (
      <div className="ui pointing menu">
        <a style={ this.itemStyle } className="item active">
          En espera
        </a>
        <a style={ this.itemStyle } className="item">
          Atendidos
        </a>
        <a style={ this.itemStyle } className="item">
          Rechazados
        </a>
      </div>
    );
  }
}

export default Menu;
