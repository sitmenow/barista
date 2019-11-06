import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './ActiveBranchTurnCard.css';
import { prepareTurn, rejectTurn, serveTurn, unprepareTurn } from './actions';


const mapStateToActiveBranchTurnCardProps = (state, props) => props;

const mapDispatchToActiveBranchTurnCardProps = (dispatch, props) => {
  return bindActionCreators(
    { prepareTurn, rejectTurn, serveTurn, unprepareTurn },
    dispatch
  );
};

const mergeActiveBranchTurnCardProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);


class ActiveBranchTurnCard extends React.Component {
  static RejectButton = ({ onClick }) => (
    <button className="ui left floated small negative button reject" onClick={ onClick } >
      Reject
    </button>
  );

  static PrepareButton = ({ onClick }) => (
    <button className="ui right floated small primary button prepare" onClick={ onClick } >
      Prepare
    </button>
  );

  static UnprepareButton = ({ onClick }) => (
    <button className="ui left floated small negative button unprepare" onClick={ onClick } >
      Unprepare
    </button>
  );

  static ServeButton = ({ onClick }) => (
    <button className="ui right floated small primary button serve" onClick={ onClick } >
      Serve
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
          { this.props.open && this.props.lock && <ActiveBranchTurnCard.ServeButton onClick={ () => this.props.serveTurn(this.props) } /> }
          { this.props.open && !this.props.lock && <ActiveBranchTurnCard.PrepareButton onClick={
            () => {
              this.props.prepareTurn(this.props);
              this.props.onPreparation();
            }} />
          }
        </div>

        <div className='eight wide computer ten wide tablet sixteen wide mobile column turn wrapper'>
          <div className={ this.getTurnCardClass() } onClick={ () => this.props.onClick(this.props.id) } >
            <div className='ui content'>
              <div className='right floated meta time'>
                { moment(this.props.requestedTime).startOf('minute').fromNow() }
              </div>
              <div className='header'>
                { this.props.product }
              </div>
              <div className='ui horizontal medium right floated label ewt'>
                EWT
                <div className="detail">
                  Y min
                </div>
              </div>
              <span className='description product'>
                { this.props.name }
              </span>
              <div className='meta company'>
                { this.props.company || 'Visitor' }
              </div>
            </div>
          </div>
        </div>

        <div className='computer tablet only four wide computer three wide tablet column'>
          { this.props.open && !this.props.lock && <ActiveBranchTurnCard.RejectButton onClick={ () => this.props.rejectTurn(this.props) } /> }
          { this.props.open && this.props.lock && <ActiveBranchTurnCard.UnprepareButton onClick={ () => {
                this.props.unprepareTurn(this.props);
                this.props.onUnpreparation();
            }} />
          }
        </div>
        <div className='mobile only sixteen wide column action wrapper'>
          { this.props.open && !this.props.lock && <ActiveBranchTurnCard.RejectButton onClick={ () => this.props.rejectTurn(this.props) } /> }
          { this.props.open && this.props.lock && <ActiveBranchTurnCard.UnprepareButton onClick={ () => {
                this.props.unprepareTurn(this.props);
                this.props.onUnpreparation();
            }} />
          }
          { this.props.open && this.props.lock && <ActiveBranchTurnCard.ServeButton onClick={ () => this.props.serveTurn(this.props) } /> }
          { this.props.open && !this.props.lock && <ActiveBranchTurnCard.PrepareButton onClick={
            () => {
              this.props.prepareTurn(this.props);
              this.props.onPreparation();
            }} />
          }
        </div>

        <div className='computer tablet only sixteen wide column blank'>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToActiveBranchTurnCardProps,
  mapDispatchToActiveBranchTurnCardProps,
  mergeActiveBranchTurnCardProps,
)(ActiveBranchTurnCard);
