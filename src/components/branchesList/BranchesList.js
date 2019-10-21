import React from 'react';

import BranchCard from '../../components/branchCard/connected';

class BranchesList extends React.Component {
  render() {
    return (
      <div className="ui cards">
        {
          this.props.branches.map(branch => (
            <BranchCard key={ branch.id } { ...branch } />
          ))
        }
      </div>
    );
  }
}

export default BranchesList;
