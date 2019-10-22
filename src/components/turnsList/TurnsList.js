import React from 'react';

import TurnCardFactory from '../turnCard/TurnCardFactory';


class TurnsList extends React.Component {
  state = {
    selectedTurnId: null,
    isListLocked: false,
  };

  handleTurnSelection = (turnId) => {
    const selectedTurnId = this.state.selectedTurnId == turnId ? null : turnId;

    if (!this.state.isListLocked) {
        this.setState({ selectedTurnId });
    }
  };

  handleTurnPreparation = () => {
    this.setState({ isListLocked: true });
  };

  handleTurnUnpreparation = () => {
    this.setState({ isListLocked: false });
  };

  render() {
    const { allowManagement, turns, user, type } = this.props;

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
                  lock: this.state.isListLocked,
                  onClick: (turnId) => this.handleTurnSelection(turnId),
                  onPreparation: () => this.handleTurnPreparation(),
                  onUnpreparation: () => this.handleTurnUnpreparation(),
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
