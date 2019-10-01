import React from 'react';

// Components
// import Header from './Header';
import BranchHeader from './BranchHeader';
import TurnCard from '../../components/turnCard/connected';
import NewTurnCard from '../../components/turnCard/NewTurnCard';
import TurnsList from '../../components/turnsList/connected';
// Styles


class CustomerTurnsDashboard extends React.Component {
  render() {
    const { user, customer, branch } = this.props;
    const turn = customer.turns.find(turn => turn.branch.id == branch.id);
    const detailBranchTurns = false;

    return (
      <div className='column'>
        { branch && <BranchHeader { ...branch } /> }
        { branch && turn && <TurnsList customer={ customer } /> }
        { branch && !turn && <NewTurnCard user={ user }/> }
        { branch && detailBranchTurns && <TurnsList customer={ customer } branch={ branch }/> }

        { !branch && <TurnsList customer={ customer } />}
      </div>
    );
  }
}

export default CustomerTurnsDashboard;
