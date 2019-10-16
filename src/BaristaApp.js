import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { } from './actions';
// Components
import BranchesDashboard from './components/branchesDashboard/connected';
import TurnsDashboard from './components/turnsDashboard/connected';
// Styles


const mapStateToBaristaAppProps = (state, props) => {
  const barista = state.user.roles.barista;
  const branch = state.app.selectedBranch;
  const user = {
    name: 'New User',
    email: '',
  };

  return Object.assign({}, props, { barista, branch, user });
};

const mapDispatchToBaristaAppProps = (dispatch) =>
  bindActionCreators({ }, dispatch);

class BaristaApp extends React.Component {
  render() {
    const { user, barista, branch } = this.props;

    return (
      <>
        {/* Decorates Menu */}
        { React.cloneElement(this.props.children, { turns: barista.branch.turns.active }) }

        <div className='seven wide column'>
          { this.props.menu.isProfileOptionSelected && <div> Profile </div> }
          { this.props.menu.isVenuesOptionSelected && !branch && <BranchesDashboard barista={ barista }/> }
          { this.props.menu.isVenuesOptionSelected && branch && <TurnsDashboard user={ user } barista={ barista } branch={ branch }/> }
        </div>
      </>
    );
  }
}


export default connect(
  mapStateToBaristaAppProps,
  mapDispatchToBaristaAppProps
)(BaristaApp);
