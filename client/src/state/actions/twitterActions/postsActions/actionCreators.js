import * as types from './actionTypes';
import postsApi from '../../../../api/twitter/postsApi';
import postsHelpers from '../../../../helpers/postsHelpers';

export const postNewPost = (newPost) => async (dispatch) => {
  dispatch({ type: types.POST_NEW_POST_START });
  const postNewPostResult = await postsApi.postNewPost(newPost);
  if ((!postNewPostResult.data) || postNewPostResult.data.Error) {
    dispatch({
      type: types.POST_NEW_POST_FAIL,
      errors: (postNewPostResult) ? postNewPostResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.POST_NEW_POST_SUCCESS,
      newPost: postNewPostResult.data
    });
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch({ type: types.GET_POSTS_START });
  const getPostsResult = await postsApi.getPosts();
  if ((!getPostsResult) || getPostsResult.data.Error) {
    dispatch({
      type: types.GET_POSTS_FAIL,
      errors: (getPostsResult) ? getPostsResult.data.Error : 'Something Went Wrong Please Try Again!!!'
    });
  } else {
    dispatch({
      type: types.GET_POSTS_SUCCESS,
      usersPosts: getPostsResult.data
    });
    return getPostsResult.data;
  }
};

export const likePost = (like = true, id, element1, element2, userToNotify, currentUser) => async (dispatch) => {
  const likePostResult = await postsApi.likePost(like, id);
  if (likePostResult.data.like) {
    postsHelpers.updateLikesDislikes(element1, element2, likePostResult.data, userToNotify, currentUser);
  }
  if ((!likePostResult) || likePostResult.data.Error) {
    dispatch({
      type: types.LIKE_POST_FAIL,
      likePostFail: true,
      likePostSuccess: false
    });
  } else {
    dispatch({
      type: types.LIKE_POST_SUCCESS,
      likePostFail: false,
      likePostSuccess: true
    });
  }
};

export const dislikePost = (like = false, id, element1, element2, userToNotify, currentUser) => async (dispatch) => {
  const dislikePostResult = await postsApi.dislikePost(like, id);
  if (dislikePostResult.data.dislike) {
    postsHelpers.updateLikesDislikes(element1, element2, dislikePostResult.data, userToNotify, currentUser);
  }
  if ((!dislikePostResult) || dislikePostResult.data.Error) {
    dispatch({
      type: types.DISLIKE_POST_FAIL,
      dislikePostFail: true,
      dislikePostSuccess: false
    });
  } else {
    dispatch({
      type: types.DISLIKE_POST_SUCCESS
    });
  }
};

export const createCommnetForPost = (post, comment) => async (dispatch) => {
  const commentResult = await postsApi.createCommentForPost(post, comment);
  if ((!commentResult) || commentResult.data.Error) {
    dispatch({
      type: types.CREATE_COMMENT_FOR_POST_FAIL
    });
  } else {
    dispatch({
      type: types.CREATE_COMMENT_FOR_POST_SUCCESS
    });
    return commentResult;
  }
};

export const loadMorePosts = (user, offset) => async (dispatch) => {
  dispatch({ type: types.LOAD_MORE_POSTS_START });
  const loadMorePostsResult = await postsApi.loadMorePosts(user, offset);
  if ((!loadMorePostsResult) || loadMorePostsResult.data.Error) {
    dispatch({
      type: types.LOAD_MORE_POSTS_FAIL
    });
  } else {
    dispatch({
      type: types.LOAD_MORE_POSTS_SUCCESS,
      posts: loadMorePostsResult.data
    });
    return true;
  }
};

export const loadMoreCommentsForPost = (post, offset) => async (dispatch) => {
  dispatch({ type: types.LOAD_MORE_COMMENTS_FOR_POST_START });
  const loadMoreCommentsForPostResult = await postsApi.loadMoreCommentsForPost(post, offset);
  if ((!loadMoreCommentsForPostResult) || loadMoreCommentsForPostResult.data.Error) {
    dispatch({
      type: types.LOAD_MORE_COMMENTS_FOR_POST_FAIL
    });
  } else {
    dispatch({
      type: types.LOAD_MORE_COMMENTS_FOR_POST_SUCCESS,
      loadedComments: loadMoreCommentsForPostResult.data
    });
    return loadMoreCommentsForPostResult.data;
  }
};
