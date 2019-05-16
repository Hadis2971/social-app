import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/authActions/logoutActions/actionCreators';
import { Redirect } from 'react-router-dom';

import { removeUserInfoFromLocalStorage } from '../../../helpers';
const Logout = (props) => {
  removeUserInfoFromLocalStorage();
  logoutUser();
  return <Redirect to='/' />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: dispatch(logoutUser())
  };
};

export default connect(null, mapDispatchToProps)(Logout);