import * as types from './actionTypes';
import usersApi from '../../../api/users/usersApi';

export const getUsersProfilePicture = () => async (dispatch) => {
  dispatch({ type: types.START_FATCHING_PICTURE });
  const id = localStorage.getItem('userID');
  const profileImageUrl = await usersApi.getProfileImage(id);
  console.log('inside get user profile picture response', profileImageUrl);
  if ((!profileImageUrl) || profileImageUrl.data.Error) {
    dispatch({
      type: types.FETCHING_PICTURE_FAIL,
      errors: (profileImageUrl) ? profileImageUrl.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.FETCHING_PICTURE_SUCCESS,
      profilePirctureURL: profileImageUrl.data.url
    });
  }
};
