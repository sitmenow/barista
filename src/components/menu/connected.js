import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from './Menu';
import { cleanSelectedBranch } from './actions';


const mapStateToMenuProps = (state, props) => props;

const mapDispatchToMenuProps = (dispatch, props) => {
  return bindActionCreators(
    { cleanSelectedBranch },
    dispatch
  );
};

const mergeMenuProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

export default connect(
  mapStateToMenuProps,
  mapDispatchToMenuProps,
  mergeMenuProps,
)(Menu);
