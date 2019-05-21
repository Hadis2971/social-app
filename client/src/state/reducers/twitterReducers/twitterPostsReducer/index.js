import * as types from '../../../actions/twitterActions/postsActions/actionTypes';
import initialState from './initialState';
import { updateStateObject } from '../../../../helpers';

const TwitterPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.POST_NEW_POST_START): {
      return updateStateObject(state, {
        ...state,
        postNewPostStart: true
      });
    }
    case (types.POST_NEW_POST_SUCCESS): {
      let helpArr = [...state.usersPosts];
      helpArr.unshift({ postText: action.newPost.postText,
        id: action.newPost.id,
        firstName: action.newPost.firstName,
        lastName: action.newPost.lastName,
        profileImage: action.newPost.profileImage });
      state = {
        ...state,
        postNewPostStart: false,
        usersPosts: [...helpArr],
        newPost: action.newPost,
        errors: null
      };
      return state;
    }
    case (types.POST_NEW_POST_FAIL): {
      return updateStateObject(state, {
        ...state,
        postNewPostStart: false,
        errors: action.errors
      });
    }
    case (types.GET_POSTS_START): {
      return updateStateObject(state, {
        ...state,
        getPostsSuccess: false,
        getPostsStart: true,
        loadMorePostsDone: false
      });
    }
    case (types.GET_POSTS_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        getPostsStart: false,
        getPostsSuccess: true,
        usersPosts: action.usersPosts
      });
    }
    case (types.GET_POSTS_FAIL): {
      return updateStateObject(state, {
        ...state,
        getPostsStart: false,
        getPostsSuccess: false,
        errors: action.errors
      });
    }
    case (types.LIKE_POST_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        dislikePostFail: false,
        dislikePostSuccess: true
      });
    }
    case (types.LIKE_POST_FAIL): {
      return updateStateObject(state, {
        ...state,
        dislikePostFail: true,
        dislikePostSuccess: false
      });
    }
    case (types.CREATE_COMMENT_FOR_POST_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        createCommentForPostSuccess: true,
        createCommentForPostFail: false
      });
    }
    case (types.CREATE_COMMENT_FOR_POST_FAIL): {
      return updateStateObject(state, {
        ...state,
        createCommentForPostSuccess: false,
        createCommentForPostFail: true
      });
    }
    case (types.LOAD_MORE_POSTS_START): {
      return updateStateObject(state, {
        ...state,
        loadMorePostsStart: true,
        loadMorePostsSuccess: false,
        loadMorePostsFail: false,
        loadMorePostsDone: false
      });
    }
    case (types.LOAD_MORE_POSTS_SUCCESS): {
      let helpArr2 = [...state.usersPosts];
      if (action.posts.length <= 0) {
        return updateStateObject(state, {
          ...state,
          loadMorePostsStart: false,
          loadMorePostsDone: true
        });
      }
      helpArr2 = helpArr2.concat(action.posts);
      return updateStateObject(state, {
        ...state,
        usersPosts: [...helpArr2],
        loadMorePostsStart: false,
        loadMorePostsSuccess: true,
        loadMorePostsFail: false,
        loadMorePostsDone: false
      });
    }
    case (types.LOAD_MORE_POSTS_FAIL): {
      return updateStateObject(state, {
        ...state,
        loadMorePostsStart: false,
        loadMorePostsSuccess: false,
        loadMorePostsFail: true,
        loadMorePostsDone: false
      });
    }
    case (types.LOAD_MORE_COMMENTS_FOR_POST_START): {
      return updateStateObject(state, {
        ...state,
        loadMoreCommentsForPostsStart: true,
        loadMoreCommentsForPostsSuccess: false,
        loadMoreCommentsForPostsFail: false,
        loadMoreCommentsForPostsDone: false
      });
    }
    case (types.LOAD_MORE_COMMENTS_FOR_POST_SUCCESS): {
      if (action.loadedComments.length <= 0) {
        return updateStateObject(state, {
          ...state,
          loadMoreCommentsForPostsDone: true
        });
      } else {
        return updateStateObject(state, {
          ...state,
          loadMoreCommentsForPostsStart: false,
          loadMoreCommentsForPostsSuccess: true,
          loadMoreCommentsForPostsFail: false,
          loadMoreCommentsForPostsDone: false
        });
      }
    }
    case (types.LOAD_MORE_COMMENTS_FOR_POST_FAIL): {
      return updateStateObject(state, {
        ...state,
        loadMoreCommentsForPostsStart: false,
        loadMoreCommentsForPostsSuccess: false,
        loadMoreCommentsForPostsFail: true,
        loadMoreCommentsForPostsDone: false
      });
    }
    default: return state;
  }
};

export default TwitterPostsReducer;
