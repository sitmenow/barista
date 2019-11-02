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

  turnStyle = (open) => {
    const style = {
      cursor: 'pointer',
    };


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
      <>
        <div className='computer tablet only four wide computer three wide tablet column'></div>
        <div className='eight wide computer ten wide tablet sixteen wide mobile column' style={{ padding: 0 }}>
          <div className='ui fluid card' style={ this.turnStyle(this.props.open) } onClick={ () => this.props.onClick(this.props.id) } >
            <div className='ui content'>
              <div style={this.timeStyle} className='right floated meta'>
                {moment(this.props.requestedTime).startOf('minute').fromNow()}
              </div>
              <div className='header'>{this.props.name}</div>
              <div style={this.labelStyle} className={'ui horizontal medium right floated label'}>
                EWT
                <div className="detail">Y min</div>
              </div>
              <span className='description'>{this.props.product}</span>
              <div className='meta' style={{ marginBottom: 0 }}>
                {this.props.company || 'Visitor'}
              </div>
            </div>
          </div>
        </div>
        <div className='computer tablet only four wide computer three wide tablet column'>
          { this.props.open &&
            <button
              className="ui small negative button"
              style={{ background: 'rgb(228, 58, 58)' }}
              onClick={ () => this.props.cancelTurn(this.props) }
            >
              Cancel
            </button>
          }
        </div>

        <div className='mobile only sixteen wide column' style={{ textAlign: 'center', padding: '0.5em' }}>
          { this.props.open &&
            <button
              className="ui small negative button"
              style={{ background: 'rgb(228, 58, 58)', marginBottom: '1em' }}
              onClick={ () => this.props.cancelTurn(this.props) }
            >
              Cancel
            </button>
          }
        </div>
        <div className='computer tablet only sixteen wide column' style={{ padding: '0.5em' }}></div>
        </>
    );
  }
}

export default connect(
  mapStateToActiveCustomerTurnCardProps,
  mapDispatchToActiveCustomerTurnCardProps,
  mergeActiveCustomerTurnCardProps,
)(ActiveCustomerTurnCard);
