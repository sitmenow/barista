import React from 'react';

// Components
import BranchesList from '../../components/branchesList/BranchesList';
import LoadingPlaceHolder from '../../components/loadingPlaceHolder/LoadingPlaceHolder';
// Styles


class BranchesDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      branches: [],
    };

    this.props.loadBranches()
      .then(branches => this.setState({ branches }));
  }

  render() {
    return (
      <div className='twelve wide column' style={{ paddingRight: 0 }}>
        <div className='column'>
          { this.state.branches && <BranchesList branches={ this.state.branches }/> }
          { !this.state.branches.length && <LoadingPlaceHolder /> }
        </div>
      </div>
    );
  }
}

export default BranchesDashboard;
