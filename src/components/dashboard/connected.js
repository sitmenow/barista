import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import { loadBranch, loadBarista } from './actions';

const mapStateToDashboardProps = (state) => {
  const branch = {
    name: state.barista.branch.name,
    lastOpeningTime: state.barista.branch.lastOpeningTime,
  };

  const barista = {
    name: state.barista.name,
    role: state.barista.role,
  };

  return { branch, barista };
};

const mapDispatchToDashboardProps = (dispatch) =>
  bindActionCreators({ loadBranch, loadBarista }, dispatch);

export default connect(
  mapStateToDashboardProps,
  mapDispatchToDashboardProps,
)(Dashboard);
