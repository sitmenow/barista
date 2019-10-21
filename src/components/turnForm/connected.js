import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TurnForm from './TurnForm';
import { createTurnAsCustomer } from './actions';


const mapStateToTurnFormProps = (state, props) => props;

const mapDispatchToTurnFormProps = (dispatch, props) => {
  return bindActionCreators({ createTurnAsCustomer }, dispatch);
};

const mergeTurnFormProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);


export default connect(
  mapStateToTurnFormProps,
  mapDispatchToTurnFormProps,
  mergeTurnFormProps,
)(TurnForm);
