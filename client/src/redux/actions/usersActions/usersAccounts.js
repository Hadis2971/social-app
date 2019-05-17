import * as types from './actionTypes';
import { updateInfoLocalStorage } from '../../../helpers';
import usersApi from '../../../api/users/usersApi';

export const getUsersProfilePage = (id) => async (dispatch) => {
  dispatch({ type: types.GET_USERS_PROFILE_PAGE_START });
  const getProfilePageResult = await usersApi.getRequestedProfilePage(id);
  if ((!getProfilePageResult) || getProfilePageResult.data.Error) {
    dispatch({
      type: types.GET_USERS_PROFILE_PAGE_FAIL
    });
  } else {
    dispatch({
      type: types.GET_USERS_PROFILE_PAGE_SUCCESS,
      user: getProfilePageResult.data
    });
  }
};

export const updateUserInfo = (newInfo) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_START });
  const updateUserResult = await usersApi.updateUserInfo(newInfo);
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
