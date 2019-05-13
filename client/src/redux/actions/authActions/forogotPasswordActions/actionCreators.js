import * as types from './actionTypes';
import authApis from '../../../../api/auth/authApis';

export const forgotPassword = (userEmail) => async (dispatch) => {
  dispatch({ type: types.FOROGOT_PASSWORD_EMAIL_SEND_START });
  const forgotPasswordResult = await authApis.forgotUserPassword(userEmail);
  if ((!forgotPasswordResult) || forgotPasswordResult.data.Error) {
    dispatch({
      type: types.FOROGOT_PASSWORD_EMAIL_SEND_FAIL
    });
  } else {
    dispatch({
      type: types.FOROGOT_PASSWORD_EMAIL_SEND_SUCCESS
    });
  }
};
