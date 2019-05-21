import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ForgotPasswordComponent from './forgotPasswordComponent';
import { forgotPassword } from '../../../state/actions/authActions/forogotPasswordActions/actionCreators';

const mapStateToProps = (state) => {
  return {
    forgotPasswordEmailSendSuccess: state.authReducer.forgotPassword.forgotPasswordEmailSendSuccess,
    forgotPasswordEmailSendFail: state.authReducer.forgotPassword.forgotPasswordEmailSendFail,
    forgotPasswordEmailSendStart: state.authReducer.forgotPassword.forgotPasswordEmailSendStart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        forgotPassword
      },
      dispatch
    )
  };
};

const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent);

export default ForgotPasswordContainer;
