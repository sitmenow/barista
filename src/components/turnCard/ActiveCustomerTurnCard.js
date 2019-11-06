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
  static CancelButton = ({ onClick }) => (
    <button className="ui left floated small negative button cancel" onClick={ onClick } >
      Cancel
    </button>
  );

  getTurnCardClass = () => {
    if (this.props.open) return 'ui fluid card selected';
    return 'ui fluid card';
  };

  render() {
    return (
      <>
        <div className='computer tablet only four wide computer three wide tablet column'>
        </div>

        <div className='eight wide computer ten wide tablet sixteen wide mobile column turn wrapper'>
          <div className={ this.getTurnCardClass() } onClick={ () => this.props.onClick(this.props.id) } >
            <div className='ui content'>
              <div className='right floated meta time'>
                { moment(this.props.requestedTime).startOf('minute').fromNow() }
              </div>
              <div className='header'>
                { this.props.name }
              </div>
              <div className='ui horizontal medium right floated label ewt'>
                EWT
                <div className="detail">
                  Y min
                </div>
              </div>
              <span className='description product'>
                { this.props.product }
              </span>
              <div className='meta company'>
                { this.props.company || 'Visitor' }
              </div>
            </div>
          </div>
        </div>

        <div className='computer tablet only four wide computer three wide tablet column'>
          { this.props.open && <ActiveCustomerTurnCard.CancelButton onClick={ () => this.props.cancelTurn(this.props) } /> }
        </div>

        <div className='mobile only sixteen wide column action wrapper'>
          { this.props.open && <ActiveCustomerTurnCard.CancelButton onClick={ () => this.props.cancelTurn(this.props) } /> }
        </div>
        <div className='computer tablet only sixteen wide column blank'>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToActiveCustomerTurnCardProps,
  mapDispatchToActiveCustomerTurnCardProps,
  mergeActiveCustomerTurnCardProps,
)(ActiveCustomerTurnCard);
