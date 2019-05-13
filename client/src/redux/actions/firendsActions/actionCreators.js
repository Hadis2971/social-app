import * as types from './actionTypes';
import usersApi from '../../../api/users/usersApi';

export const addNewFriend = (users, element) => async (dispatch) => {
  dispatch({ type: types.SEND_FRIEND_REQUEST_START });
  const addNewFriendResult = await usersApi.addNewFriend(users, element);
  if ((!addNewFriendResult) || addNewFriendResult.data.Error) {
    dispatch({
      type: types.SEND_FRIEND_REQUEST_FAIL,
      errors: (addNewFriendResult) ? addNewFriendResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.SEND_FRIEND_REQUEST_SUCCESS
    });
  }
};

export const searchForFriends = (searchTerm) => async (dispatch) => {
  dispatch({ type: types.SEARCH_FOR_FRIEND_START });
  const searchresult = await usersApi.getAllSearchedUsers(searchTerm);
  if ((!searchresult) || searchresult.data.Error) {
    dispatch({
      type: types.SEARCH_FOR_FRIEND_FAIL,
      searchForFriendsError: (searchresult) ? searchresult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.SEARCH_FOR_FRIEND_SUCCESS,
      foundUsers: searchresult.data
    });
  }
};

export const getAllFriendRequests = () => async (dispatch) => {
  dispatch({ type: types.START_FETCHING_FRIEND_REQUESTS });
  const fetchingFriendRequestResult = await usersApi.getAllFriendRequests();
  if ((!fetchingFriendRequestResult) || fetchingFriendRequestResult.data.Error) {
    dispatch({
      type: types.FAIL_FETCHING_FRIEND_REQUESTS,
      errors: (fetchingFriendRequestResult) ? fetchingFriendRequestResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.SUCCESS_FETCHING_FRIEND_REQUESTS,
      friendRequests: fetchingFriendRequestResult.data
    });
  }
};

export const acceptFriendRequest = (id, element) => async (dispatch) => {
  const acceptFriendRequestResult = await usersApi.acceptFriendRequest(id, element);
  if ((!acceptFriendRequestResult) || acceptFriendRequestResult.data.Error) {
    dispatch({
      type: types.CONFIRM_FRIEND_REQUEST_FAIL,
      confrimFriendRequestSuccess: false,
      confirmFriendsError: (acceptFriendRequestResult) ? acceptFriendRequestResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.CONFIRM_FRIEND_REQUEST_SUCCESS,
      confrimFriendRequestSuccess: true
    });
  }
};

export const declineFriendRequest = (id, element) => async (dispatch) => {
  const declineFriendRequestResult = await usersApi.declineFriendRequest(id, element);
  if ((!declineFriendRequestResult) || declineFriendRequestResult.data.Error) {
    dispatch({
      type: types.CONFIRM_FRIEND_REQUEST_FAIL,
      confrimFriendRequestSuccess: false,
      confirmFriendsError: (declineFriendRequestResult) ? declineFriendRequestResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.CONFIRM_FRIEND_REQUEST_SUCCESS,
      confrimFriendRequestSuccess: true
    });
  }
};
