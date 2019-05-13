import * as types from './actionTypes';
import { decodeAuthToken, saveUserInfoInLocalStorage } from '../../../../helpers';
import authApis from '../../../../api/auth/authApis';

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: types.LOGIN_START });
  const loginResult = await authApis.loginUser(user);
  if ((!loginResult) || loginResult.data.Error) {
    dispatch({
      type: types.LOGIN_FAIL,
      errors: (loginResult) ? loginResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    const { token, refreshToken } = loginResult.data;
    const userData = await decodeAuthToken(token);
    saveUserInfoInLocalStorage({
      token: token,
      refreshToken: refreshToken,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userID: userData.userID,
      username: userData.username,
      userEmail: userData.userEmail,
      profileImage: userData.profileImage
    });
    dispatch({
      type: types.LOGIN_SUCCESS,
      userID: userData.userID,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userEmail: userData.userEmail,
      profileImage: userData.profileImage,
      token: token,
      refreshToken: refreshToken,
      isAuthenticated: (!!token),
      errors: null,
      authenticatingStart: false
    });
  }
};
