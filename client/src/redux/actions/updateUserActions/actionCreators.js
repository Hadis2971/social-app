import userApi from '../../../api/users/usersApi';
import { updateInfoLocalStorage } from '../../../helpers';
import * as types from './actionTypes';

export const updateUserInfo = (newInfo) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_START });
  const updateUserResult = await userApi.updateUserInfo(newInfo);
  if ((!updateUserResult) || updateUserResult.data.Error) {
    dispatch({
      type: types.UPDATE_USER_FAILE,
      errors: (updateUserResult) ? updateUserResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    updateInfoLocalStorage(updateUserResult.data);
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      user: updateUserResult.data
    });
  }
};
