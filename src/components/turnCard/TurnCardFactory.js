import React from 'react';

import TurnCard from './TurnCard';
import ActiveCustomerTurnCard from './ActiveCustomerTurnCard';
import ActiveBranchTurnCard from './ActiveBranchTurnCard';


class TurnCardFactory {
  static create(props) {
    switch(props.type) {
      case 'active-customer':
        return <ActiveCustomerTurnCard {...props} />;
      case 'detailed-customer':
        return <TurnCard {...props} />;
      case 'active-branch':
        return <ActiveBranchTurnCard {...props} />;
      case 'detailed-branch':
        return <TurnCard {...props} />;
      default:
        return <TurnCard {...props} />;
    }
  }
}

export default TurnCardFactory;
