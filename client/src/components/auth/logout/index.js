import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../state/actions/authActions/logoutActions/actionCreators';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  logoutUser();
  return <Redirect to='/' />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: dispatch(logoutUser())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
