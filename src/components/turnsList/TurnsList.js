import React from 'react';

import TurnCardFactory from '../turnCard/TurnCardFactory';


class TurnsList extends React.Component {
  state = {
    selectedTurnId: null,
  };

  handleTurnSelection = (isUserPreparing) => (turnId) => {
    const selectedTurnId = this.state.selectedTurnId == turnId ? null : turnId;

    if (!isUserPreparing) {
        this.setState({ selectedTurnId });
    }
  }

  render() {
    const { allowManagement, turns, user, type } = this.props;
    const { selectedTurnId } = this.state;

    return (
      <div className='ui divided fluid items' style={{ margin: 0 }}>
        <div style={{ padding: 0, border: 'none' }}></div>
        {
          turns.map((turn, index) =>
            TurnCardFactory.create(
              Object.assign(
                {
                  key: index,
                  index: index,
                  open: this.state.selectedTurnId === turn.id,
                  lock: user.status.preparing,
                  select: this.handleTurnSelection(user.status.preparing),
                  type,
                  allowManagement,
                },
                turn
              )
            )
          )
        }
        <div style={{ padding: 0, border: 'none' }}></div>
      </div>
    );
  }
}

export default TurnsList;
