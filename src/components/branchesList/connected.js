import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BranchesList from './BranchesList';
import {} from './actions';

const mapStateToTurnsProps = (state, props) => Object.assign({}, state, props)

const mapDispatchToTurnsProps = (dispatch) =>
  bindActionCreators(
    {},
    dispatch
  );

const mergeTurnsProps = (stateProps, dispatchProps, ownProps) => (
  {
  }
);

export default connect(
  mapStateToTurnsProps,
  mapDispatchToTurnsProps,
  // mergeTurnsProps,
)(BranchesList);
