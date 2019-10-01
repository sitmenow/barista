import React from 'react';

// Components
import BranchesList from '../../components/branchesList/connected';
// Styles


class BranchesDashboard extends React.Component {
  render() {
    return (
      <div className='twelve wide column' style={{ paddingRight: 0 }}>
        <div className='column'>
          <BranchesList />
        </div>
      </div>
    );
  }
}

export default BranchesDashboard;
