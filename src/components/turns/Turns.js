import React from 'react';

import Turn from '../turn/Turn';

class Turns extends React.Component {
  componentDidMount () {
    this.props.loadTurns();
    setInterval(
      () => {
        console.log('loading turns!');
        this.props.loadTurns();
      },
      5000
    );
  }

  state = {
    selectedTurnId: null,
  };

  handleTurnSelection = (isBaristaPreparing) => (turnId) => {
    if (!isBaristaPreparing) {
      this.setState({ selectedTurnId: turnId });
    }
  }

  render() {
    const {
      turns,
      barista,
      prepareTurn,
      unprepareTurn,
      serveTurn,
      rejectTurn,
    } = this.props;

    const { selectedTurnId } = this.state;

    return (
      <div className='ui divided items'>
        <div className='ui item'> </div>
        {
          turns.map((turn, index) => (
            <Turn
              {...turn}
              key={index}
              open={selectedTurnId === turn.id}
              isBaristaPreparing={barista.isPreparing}
              actions={{
                select: this.handleTurnSelection(barista.isPreparing),
                prepare: () => prepareTurn(turn.id),
                unprepare: () => unprepareTurn(turn.id),
                serve: () => serveTurn(turn.id),
                reject: () => rejectTurn(turn.id),
              }} />
          ))
        }
      </div>
    );
  }
}

export default Turns;
