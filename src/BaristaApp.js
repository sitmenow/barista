import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';
// Components
import BranchesDashboard from './components/branchesDashboard/BranchesDashboard';
import BaristaTurnsDashboard from './components/turnsDashboard/TurnsDashboard';
// Styles


const mapStateToAppProps = (state, props) => {
  const barista = state.user.roles.barista;
  const branch = { id: state.app.selectedBranch };

  return Object.assign({}, props, { barista, branch });
};

const mapDispatchToAppProps = (dispatch) =>
  bindActionCreators({ }, dispatch);

class BaristaApp extends React.Component {
  render() {
    const { barista, branch } = this.props;

    return (
      <div className='seven wide column'>
        branch && <BaristaTurnsDashboard barista={ barista } branch={ branch }/>
        !branch && <BranchesDashboard barista={ barista } />
      </div>
    );
  }
}


export default connect(mapStateToAppProps, mapDispatchToAppProps)(BaristaApp);
