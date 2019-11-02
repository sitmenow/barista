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
      isTurnFormEnabled: false,
      isActiveTurnsListEnabled: true,
      isCompletedTurnsListEnabled: false,
    };

    // TODO: Find strategy to avoid loading every single time this
    // gets initialized
    this.props.loadActiveTurns();
  }

  filterTurnsByBranch = (turns = [], branch) => {
    return turns.reduce((result, turn) => {
      if (turn.branch.id == branch.id) {
        result.push(turn);
      }
      return result;
    }, []);
  };

  enableActiveTurnsList = () => {
    this.props.loadActiveTurns();

    this.setState({
      isActiveTurnsListEnabled: true,
      isCompletedTurnsListEnabled: false,
    });
  };

  enableCompletedTurnsList = () => {
    this.props.loadCompletedTurns();

    this.setState({
      isActiveTurnsListEnabled: false,
      isCompletedTurnsListEnabled: true,
    });
  };

  enableTurnForm = () => {
    this.setState({
      isTurnFormEnabled: true,
    });
  };

  disableTurnForm = () => {
    this.setState({
      isTurnFormEnabled: false,
    });
  };


  render() {
    const { user, role, branch, allowManagement } = this.props;
    let activeTurns = this.props.activeTurns;
    let completedTurns = this.props.completedTurns;
    let listType = 'customer';

    if (branch) {
      activeTurns = this.filterTurnsByBranch(this.props.activeTurns, branch)
      completedTurns = this.filterTurnsByBranch(this.props.completedTurns, branch);
    }

    if (allowManagement) {
      listType = 'branch';
    }

    return (
      <>
        { branch && <BranchHeader { ...branch } createTurnButtonOnClick={ () => this.enableTurnForm() } /> }

        <div className='ui centered grid' style={{ margin: 0 }}>
          <div className='eight wide computer ten wide tablet sixteen wide mobile column' style={{ padding: 0 }}>
            <Menu
              activeTurnsButtonOnClick={ () => this.enableActiveTurnsList() }
              completedTurnsButtonOnClick={ () => this.enableCompletedTurnsList() }
              isActiveTurnsListEnabled={ this.state.isActiveTurnsListEnabled }
              isCompletedTurnsListEnabled={ this.state.isCompletedTurnsListEnabled }
            />
            { this.state.isTurnFormEnabled && <TurnForm user={ user } cancelButtonOnClick={ () => this.disableTurnForm() } /> }
          </div>
        </div>

          {/* TODO: Show loader when app is in loading state */}
          {
            this.state.isActiveTurnsListEnabled &&
              <TurnsList
                user={ role }
                turns={ activeTurns }
                type={ 'active-' + listType }
                allowManagement={ allowManagement }
              />
          }
          {
            this.state.isCompletedTurnsListEnabled &&
              <TurnsList
                user={ role }
                turns={ completedTurns }
                type={ 'detailed-' + listType }
              />
          }
      </>
    );
  }
}

export default TurnsDashboard;
