import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ForgotPasswordComponent from './forgotPasswordComponent';
import { forgotPassword } from '../../../redux/actions/authActions/forogotPasswordActions/actionCreators';

const mapStateToProps = (state) => {
  return {
    forgotPasswordEmailSendSuccess: state.forgotPasswordReducer.forgotPasswordEmailSendSuccess,
    forgotPasswordEmailSendFail: state.forgotPasswordReducer.forgotPasswordEmailSendFail,
    forgotPasswordEmailSendStart: state.forgotPasswordReducer.forgotPasswordEmailSendStart
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
