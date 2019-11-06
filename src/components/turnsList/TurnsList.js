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

  // <div style={{ overflowY: 'overlay', height: '50%', margin: '1em -1em 0 -1em'}}>
  render() {
    const { allowManagement, turns, user, type } = this.props;

    return (
      <div className='ui grid' style={{ margin: '1em 0 0 0', alignItems:'center'}}>
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
      </div>
    );
  }
}

export default TurnsList;
