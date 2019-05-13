import * as types from './actionTypes';
import postsApi from '../../../../api/twitter/postsApi';
import { updateLikesDislikes } from '../../../../helpers';

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
  console.log('isnide get posts', getPostsResult);
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
  }
};

export const likePost = (like = true, id, element1, element2) => async (dispatch) => {
  const likePostResult = await postsApi.likePost(like, id);
  if (likePostResult.data.like) updateLikesDislikes(element1, element2, likePostResult.data);
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

export const dislikePost = (like = false, id, element1, element2) => async (dispatch) => {
  const dislikePostResult = await postsApi.dislikePost(like, id);
  if (dislikePostResult.data.dislike) updateLikesDislikes(element1, element2, dislikePostResult.data);
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
