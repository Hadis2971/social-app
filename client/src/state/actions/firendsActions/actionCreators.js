import * as types from './actionTypes';
import usersApi from '../../../api/users/usersApi';
import friendsApi from '../../../api/users/friendsApi';

export const addNewFriend = (users, element) => async (dispatch) => {
  dispatch({ type: types.SEND_FRIEND_REQUEST_START });
  const addNewFriendResult = await friendsApi.addNewFriend(users, element);
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
  const fetchingFriendRequestResult = await friendsApi.getAllFriendRequests();
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
  const acceptFriendRequestResult = await friendsApi.acceptFriendRequest(id, element);
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
  const declineFriendRequestResult = await friendsApi.declineFriendRequest(id, element);
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

export const getOnlineFriends = (userID) => async (dispatch) => {
  dispatch({ type: types.GET_ONLINE_FRIENDS_START });
  const getOnlineFriendsResult = await friendsApi.getOnlineFriends(userID);
  if ((!getOnlineFriendsResult) || getOnlineFriendsResult.data.Error) {
    dispatch({
      type: types.GET_ONLINE_FRIENDS_FAIL
    });
  } else {
    dispatch({
      type: types.GET_ONLINE_FRIENDS_SUCCESS,
      onlineFriends: getOnlineFriendsResult.data
    });
  }
};
