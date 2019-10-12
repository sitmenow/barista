import React from 'react';

import TurnCard from '../turnCard/ActiveCustomerTurnCard';


class TurnsList extends React.Component {
  state = {
    selectedTurnId: null,
  };

  handleTurnSelection = (isUserPreparing) => (turnId) => {
    if (!isUserPreparing) {
      if (this.state.selectedTurnId == turnId) {
        this.setState({ selectedTurnId: null });
      } else {
        this.setState({ selectedTurnId: turnId });
      }
    }
  }

  render() {
    const { allowManagement, turns, user } = this.props;
    const { selectedTurnId } = this.state;

    return (
      <>
        <div className='ui divided fluid items' style={{ margin: 0 }}>
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
          <div style={{ padding: 0, border: 'none' }}></div>
        </div>
      </>
    );
  }
}

export default TurnsList;
