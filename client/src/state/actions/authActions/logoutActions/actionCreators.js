import * as types from './actionTypes';
import authApis from '../../../../api/auth/authApis';
import usersHelpers from '../../../../helpers/usersHelpers';

export const logoutUser = (userID) => (dispatch) => {
  authApis.logoutUser(userID);
  usersHelpers.removeUserInfoFromLocalStorage();
  dispatch({ type: types.LOGOUT_USER });
};
