import React from 'react';

import TurnCard from '../turnCard/connected';
import Menu from './Menu';


class TurnsList extends React.Component {
  componentDidMount () {
    // setInterval(() => this.props.loadTurns(), 5000);
  }

  state = {
    selectedTurnId: null,
  };

  handleTurnSelection = (isUserPreparing) => (turnId) => {
    if (!isUserPreparing) {
      this.setState({ selectedTurnId: turnId });
    }
  }

  render() {
    const { allowManagement, turns, user } = this.props;
    const { selectedTurnId } = this.state;

    return (
      <>
      {/* <Menu /> */ }
        <div className='ui divided fluid items card' style={{ margin: 0 }}>
          <div style={{ padding: 0, border: 'none' }}></div>
          {
            turns.map((turn, index) => (
              <TurnCard
                {...turn}
                key={ index }
                index={ index }
                open={ selectedTurnId === turn.id }
                lock={ user.status.preparing }
                select={ this.handleTurnSelection(user.status.preparing) }
                allowManagement={ allowManagement }
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default TurnsList;
