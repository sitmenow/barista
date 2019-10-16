import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BranchesDashboard from './BranchesDashboard';
import { loadBaristaBranches, loadCustomerBranches } from './actions';


const mapStateToBranchesDashboardProps = (state, props) => props;

const mapDispatchToBranchesDashboardProps = (dispatch, props) => {
  let loadBranches = () => async () => {};

  if (props.barista) {
    loadBranches = loadBaristaBranches;
    loadBranches = loadCustomerBranches;
  }

  if (props.customer) {
    loadBranches = loadCustomerBranches;
  }

  return bindActionCreators({ loadBranches }, dispatch);
};

const mergeBranchesDashboardProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

export default connect(
  mapStateToBranchesDashboardProps,
  mapDispatchToBranchesDashboardProps,
  mergeBranchesDashboardProps,
)(BranchesDashboard);
