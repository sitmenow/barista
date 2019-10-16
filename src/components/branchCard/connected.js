import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BranchCard from './BranchCard';
import { selectBranch } from './actions';


const mapStateToBranchCardProps = (state, props) => props;

const mapDispatchToBranchCardProps = (dispatch) =>
  bindActionCreators({ selectBranch }, dispatch);

const mergeBranchCardProps = (stateProps, dispatchProps, ownProps) => ({});

export default connect(
  mapStateToBranchCardProps,
  mapDispatchToBranchCardProps,
  // mergeTurnsProps,
)(BranchCard);
