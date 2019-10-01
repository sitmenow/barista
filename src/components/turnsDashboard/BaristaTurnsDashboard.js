import React from 'react';

// Components
// import Header from './Header';
import BranchHeader from './BranchHeader';
import ActiveTurnCard from '../../components/turnCard/ActiveTurnCard';
import NewTurnCard from '../../components/turnCard/NewTurnCard';
import TurnsList from '../../components/turnsList/connected';
// Styles


class BaristaTurnsDashboard extends React.Component {
  render() {
    const { barista, branch } = this.props;

    return (
      <div className='seven wide column'>
        <div className='column'>
          <BranchHeader { ...branch } />
          <NewTurnCard />
          <TurnsList barista={ barista } branch={ branch }/>
        </div>
      </div>
    );
  }
}

export default BaristaTurnsDashboard;
