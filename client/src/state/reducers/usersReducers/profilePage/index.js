import * as types from '../../../actions/usersActions/actionTypes';
import initialState from './initialState';
import { updateStateObject } from '../../../../helpers';
const usersProfilePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.GET_USERS_PROFILE_PAGE_START): {
      state = {
        getRequestedProfileStart: true,
        getRequestedProfileSuccess: false,
        getRequestedProfileFail: false,
        user: null,
        posts: []
      };
      return state;
    }
    case (types.GET_USERS_PROFILE_PAGE_SUCCESS): {
      state = {
        getRequestedProfileStart: false,
        getRequestedProfileSuccess: true,
        getRequestedProfileFail: false,
        user: action.user,
        posts: action.posts
      };
      return state;
    }
    case (types.GET_USERS_PROFILE_PAGE_FAIL): {
      state = {
        getRequestedProfileStart: false,
        getRequestedProfileSuccess: false,
        getRequestedProfileFail: true,
        user: null,
        posts: []
      };
      return state;
    }
    case (types.LOAD_MORE_POSTS_REQUESTED_PROFILE_START): {
      return updateStateObject(state, {
        ...state,
        loadMoreRequsetdProfilePostsStart: true,
        loadMoreRequsetdProfilePostsSuccess: false,
        loadMoreRequsetdProfilePostsFail: false,
        loadMoreRequsetdProfilePostsDone: false
      });
    }
    case (types.LOAD_MORE_POSTS_REQUESTED_PROFILE_SUCCESS): {
      let helpArr2 = [...state.posts];
      if (action.loadedPostsForRequestedProfile.length <= 0) {
        return updateStateObject(state, {
          ...state,
          loadMoreRequsetdProfilePostsStart: false,
          loadMoreRequsetdProfilePostsDone: true
        });
      }

      helpArr2 = helpArr2.concat(action.loadedPostsForRequestedProfile);
      return updateStateObject(state, {
        ...state,
        posts: [...helpArr2],
        loadMoreRequsetdProfilePostsStart: false,
        loadMoreRequsetdProfilePostsSuccess: true,
        loadMoreRequsetdProfilePostsFail: false,
        loadMoreRequsetdProfilePostsDone: false
      });
    }
    case (types.LOAD_MORE_POSTS_REQUESTED_PROFILE_FAIL): {
      return updateStateObject(state, {
        ...state,
        loadMoreRequsetdProfilePostsStart: false,
        loadMoreRequsetdProfilePostsSuccess: false,
        loadMoreRequsetdProfilePostsFail: true
      });
    }
    default: return state;
  }
};

export default usersProfilePageReducer;
