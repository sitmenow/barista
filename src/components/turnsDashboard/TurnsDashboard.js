import React from 'react';

// Components
import BranchHeader from './BranchHeader';
import TurnCard from '../../components/turnCard/connected';
import TurnForm from '../../components/turnForm/connected';
import TurnsList from '../../components/turnsList/TurnsList';
import Menu from './Menu';
// Styles


class TurnsDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTurnForm: false,
      turns: this.filterTurnsByBranch(
        this.props.turns, this.props.branch
      ),
    };
  }

  filterTurnsByBranch = (turns, branch) => {
    if (!branch) return turns;

    return turns.reduce((result, turn) => {
      if (turn.branch.id == branch.id) {
        result.push(turn);
      }
      return result;
    }, []);
  };

  // Returns stored turns for each role
  getActiveTurns = () => {
    this.setState({
      turns: this.filterTurnsByBranch(
        this.props.turns, this.props.branch
      ),
    });
  };

  // Returns fetched turns that are completed
  // We do not need to store this turns for now.
  getCompletedTurns = () => {
    this.props.loadTurns((turns) => {
      this.setState({ turns });
    });
  };

  showTurnForm = () => {
    this.setState({
      showTurnForm: true,
    });
  };

  hideTurnForm = () => {
    this.setState({
      showTurnForm: false,
    });
  };


  render() {
    const { user, role, branch } = this.props;

    return (
      <div className='column'>
        { branch && <BranchHeader { ...branch } showTurnForm={ () => this.showTurnForm() } /> }
        <Menu handleActiveOnClick={ () => this.getActiveTurns() } handleCompletedOnClick={ () => this.getCompletedTurns() } />
        { this.state.showTurnForm && <TurnForm user={ user } hideTurnForm={ () => this.hideTurnForm() }/> }
        <TurnsList user={ role } turns={ this.state.turns } />
      </div>
    );
  }
}

export default TurnsDashboard;
