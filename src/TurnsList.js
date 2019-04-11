import React from 'react';
import { connect } from 'react-redux';

import Turns from './components/Turns';

const mapStateToTurnsProps = (state) => {
  const turns = state.turns.map(turn => (
    {
      id: turn.id,
      name: turn.name,
      company: turn.company,
      companyShortName: turn.companyShortName,
      product: turn.product,
      requestedTime: turn.requestedTime,
      status: turn.status,
      color: turn.color,
    }
  ));

  return {
    turns,
  };
};

const mapDispatchToTurnsProps = (dispatch) => (
  {
    // onClick: (id) => (
    //   dispatch(openThread(id))
    // ),
  }
);

const TurnsList = connect(
  mapStateToTurnsProps,
  mapDispatchToTurnsProps
)(Turns);

export default TurnsList;
