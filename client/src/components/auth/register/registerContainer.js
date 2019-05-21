import RegisterComponent from './registerComponent';
import * as registerActionCreators from '../../../state/actions/authActions/registerActions/actionCreators';
import { loginUser } from '../../../state/actions/authActions/loginActions/actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    registerStart: state.authReducer.register.registerStart,
    errors: state.authReducer.register.errors,
    registerSuccess: state.authReducer.register.registerSuccess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...registerActionCreators,
      loginUser
    },
    dispatch
    )
  };
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps)(RegisterComponent);

export default RegisterContainer;
