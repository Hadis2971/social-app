import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginActionCreators from '../../../redux/actions/authActions/loginActions/actionCreators';
import LoginComponent from './loginComponent';

const mapStateToProps = (state) => {
  return {
    authenticatingStart: state.login.authenticatingStart,
    isAuthenticated: state.login.isAuthenticated,
    errors: state.login.errors,
    userEmail: state.login.userEmail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        ...loginActionCreators
      },
      dispatch
    )
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default LoginContainer;
