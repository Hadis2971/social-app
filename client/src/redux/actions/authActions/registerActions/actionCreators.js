import * as types from './actionTypes';
import authApis from '../../../../api/auth/authApis';

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: types.REGISTER_START });
  const registerResult = await authApis.registerUser(user);
  if ((!registerResult) || registerResult.data.Error) {
    dispatch({
      type: types.REGISTER_FAIL,
      registerSuccess: true,
      errors: (registerResult) ? registerResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.REGISTER_SUCCESS,
      registerSuccess: true
    });
  }
};
