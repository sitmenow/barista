import React from 'react';
import moment from 'moment';

import './ActiveCustomerTurnCard.css';


class ActiveCustomerTurnCard extends React.Component {
  timeStyle = {
    margin: 0,
  };

  labelStyle = {
    margin: '1em 0 0 0',
  };

  turnStyle = (open, index) => {
    const style = {
      cursor: 'pointer',
      display: 'block',
      padding: '1em 1em',
    };

    if (index === 0) {
     // style.border = 0;
      style.borderTop = 'none';
    }

    if (open) {
      // style.padding = '1.2em 1em';
      style.background = 'rgba(0, 0, 0, 0.05)';
      // style.border = '1px solid rgba(0,0,0,0.06)';
    }

    return style;
  };

  bannerStyle = {
    marginTop: '1em',
    background: '#f2f2f2',
    padding: '1em',
    borderRadius: '2px',
    marginLeft: '-14px',
    marginRight: '-14px',
    color: '#efefef',
    marginTop: '1em',
  };

  render() {
    return (
      <div
        style={ this.turnStyle(this.props.open, this.props.index) }
        className='ui item'
        onClick={ () => this.props.select(this.props.id) } >
        <div className='ui content'>
          <div className='right floated'>
            <div style={this.timeStyle} className='meta'>
              {moment(this.props.requestedTime).startOf('minute').fromNow()}
            </div>
            <div
              style={this.labelStyle}
              className={'ui orange horizontal small right floated label'}>
              {this.props.company || 'VISITOR'}
            </div>
          </div>
          <div className='header'>{this.props.name}</div>
          <div className='description'>{this.props.product}</div>
        </div>

        { this.props.open && false &&
        <div className="content" style={ this.bannerStyle }>
          <span className="description">
            Expected Waiting Time: 8 min
          </span>
          <button className="ui right floated negative mini button" style={{ background: 'rgb(228, 58, 58)' }}>
            Cancelar
          </button>
        </div>
      }
      </div>
    );
  }
}

export default ActiveCustomerTurnCard;
