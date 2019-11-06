import React from 'react';

class Menu extends React.Component {
  itemStyle = {
    width: '50%',
    display: 'block',
    textAlign: 'center',
  };

  getItemClass = (isActive) => {
    const klass = 'item';

    return isActive ? klass + ' active' : klass;
  }

  render() {

    return (
      <div className="ui pointing fluid menu">
        <a
          style={ this.itemStyle }
          className={ this.getItemClass(this.props.isActiveTurnsListEnabled) }
          onClick={ this.props.activeTurnsButtonOnClick } >
          Active
        </a>
        <a
          style={ this.itemStyle }
          className={ this.getItemClass(this.props.isCompletedTurnsListEnabled) } 
          onClick={ this.props.completedTurnsButtonOnClick } >
          Completed
        </a>
      </div>
    );
  }
}

export default Menu;
