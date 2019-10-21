import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './ActiveCustomerTurnCard.css';
import { cancelTurn } from './actions';


const mapStateToActiveCustomerTurnCardProps = (state, props) => props;

const mapDispatchToActiveCustomerTurnCardProps = (dispatch, props) => {
  return bindActionCreators(
    { cancelTurn },
    dispatch
  );
};

const mergeActiveCustomerTurnCardProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);


class ActiveCustomerTurnCard extends React.Component {
  timeStyle = {
    margin: 0,
    textAlign: 'right',
  };

  labelStyle = {
    margin: '1em 0 0 0',
    background: '#ec6550',
    color: 'rgb(242, 242, 242)',
  };

  turnStyle = (open, index) => {
    const style = {
      position: 'relative',
      cursor: 'pointer',
      display: 'block',
      padding: '1em 1em',
      zIndex: 100,
    };

    if (index === 0) {
      style.borderTop = 'none';
    }

    if (open) {
      style.background = 'rgba(0, 0, 0, 0.05)';
    }

    return style;
  };

  bannerStyle = {
    position: 'absolute',
    width: '120%',
    top: '30%',
    zIndex: 0,
  };

  render() {
    return (
      <div
        style={ this.turnStyle(this.props.open, this.props.index) }
        className='ui item'
        onClick={ () => this.props.onClick(this.props.id) }
      >
        <div className='ui content'>
          <div className='right floated'>
            <div style={this.timeStyle} className='meta'>
              {moment(this.props.requestedTime).startOf('minute').fromNow()}
            </div>

            <div style={this.labelStyle} className={'ui horizontal medium right floated label'}>
              EWT
              <div className="detail">Y min</div>
            </div>

          </div>
          <div className='header'>{this.props.name}</div>
          <div className='description'>{this.props.product}</div>
          <div className='meta' style={{ marginBottom: 0 }}>
              {this.props.company || 'Visitor'}
          </div>
        </div>

        { this.props.open &&
        <div className="ui content" style={ this.bannerStyle }>
          <button
            className="ui right floated negative tiny button"
            style={{ background: 'rgb(228, 58, 58)' }}
            onClick={ () => this.props.cancelTurn(this.props) }
          >
            Cancel
          </button>
        </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToActiveCustomerTurnCardProps,
  mapDispatchToActiveCustomerTurnCardProps,
  mergeActiveCustomerTurnCardProps,
)(ActiveCustomerTurnCard);
