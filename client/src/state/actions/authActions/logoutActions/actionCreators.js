import * as types from './actionTypes';
import usersHelpers from '../../../../helpers/usersHelpers';
export const logoutUser = () => {
  usersHelpers.removeUserInfoFromLocalStorage();
  return ({
    type: types.LOGOUT_USER
  });
};
