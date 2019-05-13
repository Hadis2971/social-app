import * as types from '../../actions/firendsActions/actionTypes';
import initialState from './initialState';
import { updateStateObject } from '../../../helpers';

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.SEARCH_FOR_FRIEND_START): {
      return updateStateObject(state, {
        ...state,
        searchForFriendStart: true
      });
    }
    case (types.SEARCH_FOR_FRIEND_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        foundUsers: [...action.foundUsers],
        searchForFriendStart: false,
        searchForFriendsError: null
      });
    }
    case (types.SEARCH_FOR_FRIEND_FAIL): {
      return updateStateObject(state, {
        ...state,
        searchForFriendStart: false,
        searchForFriendsError: action.searchForFriendsError
      });
    }
    case (types.SEND_FRIEND_REQUEST_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        addNewFriendSuccess: true
      });
    }
    case (types.SEND_FRIEND_REQUEST_FAIL): {
      return updateStateObject(state, {
        ...state,
        addNewFriendSuccess: false
      });
    }
    case (types.START_FETCHING_FRIEND_REQUESTS): {
      return updateStateObject(state, {
        ...state,
        startFetchingFriendRequests: true
      });
    }
    case (types.SUCCESS_FETCHING_FRIEND_REQUESTS): {
      return updateStateObject(state, {
        ...state,
        startFetchingFriendRequests: false,
        friendRequests: action.friendRequests
      });
    }
    case (types.FAIL_FETCHING_FRIEND_REQUESTS): {
      return updateStateObject(state, {
        ...state,
        startFetchingFriendRequests: false
      });
    }
    case (types.CONFIRM_FRIEND_REQUEST_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        confrimFriendRequestSuccess: true,
        confrimFriendRequestFail: false,
        confirmFriendsError: null
      });
    }
    case (types.CONFIRM_FRIEND_REQUEST_FAIL): {
      return updateStateObject(state, {
        ...state,
        confrimFriendRequestSuccess: false,
        confrimFriendRequestFail: true,
        confirmFriendsError: action.errors
      });
    }
    default: return state;
  }
};

export default friendsReducer;
