import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../state/actions/authActions/logoutActions/actionCreators';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  const userID = (localStorage.getItem('userID') - 0);
  const { logoutUser } = props;
  logoutUser(userID);
  return <Redirect to='/login' />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (userID) => dispatch(logoutUser(userID))
  };
};

export default connect(null, mapDispatchToProps)(Logout);
