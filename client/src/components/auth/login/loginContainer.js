import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginActionCreators from '../../../state/actions/authActions/loginActions/actionCreators';
import LoginComponent from './loginComponent';

const mapStateToProps = (state) => {
  return {
    authenticatingStart: state.authReducer.login.authenticatingStart,
    isAuthenticated: state.authReducer.login.isAuthenticated,
    errors: state.authReducer.login.errors,
    userEmail: state.authReducer.login.userEmail
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
