import * as types from '../../../actions/authActions/forogotPasswordActions/actionTypes';
import initialState from './initialState';

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.FOROGOT_PASSWORD_EMAIL_SEND_START): {
      state = {
        forgotPasswordEmailSendSuccess: false,
        forgotPasswordEmailSendFail: false,
        forgotPasswordEmailSendStart: true
      };
      return state;
    }
    case (types.FOROGOT_PASSWORD_EMAIL_SEND_SUCCESS): {
      state = {
        ...state,
        forgotPasswordEmailSendSuccess: true,
        forgotPasswordEmailSendFail: false,
        forgotPasswordEmailSendStart: false
      };
      return state;
    }
    case (types.FOROGOT_PASSWORD_EMAIL_SEND_FAIL): {
      state = {
        ...state,
        forgotPasswordEmailSendFail: true,
        forgotPasswordEmailSendSuccess: false,
        forgotPasswordEmailSendStart: false
      };
      return state;
    }
    default: return state;
  }
};

export default forgotPasswordReducer;
