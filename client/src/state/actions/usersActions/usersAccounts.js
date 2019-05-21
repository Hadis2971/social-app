import * as types from './actionTypes';
import usersHelpers from '../../../helpers/usersHelpers';
import usersApi from '../../../api/users/usersApi';
import postsApi from '../../../api/twitter/postsApi';

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
      user: getProfilePageResult.data.user,
      posts: getProfilePageResult.data.posts
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
    usersHelpers.updateUserInfoInLocalStorage(updateUserResult.data);
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      user: updateUserResult.data
    });
  }
  return updateUserResult;
};

export const loadMorePostsForRequestedProfile = (user, offset) => async (dispatch) => {
  dispatch({ type: types.LOAD_MORE_POSTS_REQUESTED_PROFILE_START });
  const loadMorePostsForRequestedProfileResult = await postsApi.loadMorePostsForRequestedProfile(user, offset);
  console.log('inside loadMorePostsForRequestedProfile result', loadMorePostsForRequestedProfileResult);
  if ((!loadMorePostsForRequestedProfileResult) || loadMorePostsForRequestedProfileResult.data.Error) {
    dispatch({
      type: types.LOAD_MORE_POSTS_REQUESTED_PROFILE_FAIL
    });
  } else {
    dispatch({
      type: types.LOAD_MORE_POSTS_REQUESTED_PROFILE_SUCCESS,
      loadedPostsForRequestedProfile: loadMorePostsForRequestedProfileResult.data
    });
    return true;
  }
};
