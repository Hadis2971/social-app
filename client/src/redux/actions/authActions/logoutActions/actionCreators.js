import * as types from './actionTypes';

export const logoutUser = () => {
  return ({
    type: types.LOGOUT_USER
  });
};
