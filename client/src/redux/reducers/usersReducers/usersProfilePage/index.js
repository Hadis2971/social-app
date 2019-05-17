import * as types from '../../../actions/usersActions/actionTypes';
import initialState from './initialState';
const UsersAccoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.GET_USERS_PROFILE_PAGE_START): {
      state = {
        getRequestedProfileStart: true,
        getRequestedProfileSuccess: false,
        getRequestedProfileFail: false,
        user: null
      };
      return state;
    }
    case (types.GET_USERS_PROFILE_PAGE_SUCCESS): {
      state = {
        getRequestedProfileStart: false,
        getRequestedProfileSuccess: true,
        getRequestedProfileFail: false,
        user: action.user
      };
      return state;
    }
    case (types.GET_USERS_PROFILE_PAGE_FAIL): {
      state = {
        getRequestedProfileStart: false,
        getRequestedProfileSuccess: false,
        getRequestedProfileFail: true,
        user: null
      };
      return state;
    }
    default: return state;
  }
};

export default UsersAccoutsReducer;
