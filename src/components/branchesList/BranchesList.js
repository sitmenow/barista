import React from 'react';

import BranchCard from '../../components/branchCard/connected';


const branches = [
  {
    id: '5cc53f9d3a7f91fbc3701953',
    name: 'Wizeline',
    picture: '/terrible_juan_wizeline.jpg',
    brand: {
      id: '5cc53f833a7f91fbc3701952',
      name: 'El Terrible Juan',
      picture: '/terrible_juan_logo.jpg',
    },
  },
];

class BranchesList extends React.Component {
  render() {
    return (
      <div className="ui cards">
        {
          branches.map(branch => (
            <BranchCard key={ branch.id } { ...branch } />
          ))
        }
      </div>
    );
  }
}

export default BranchesList;
