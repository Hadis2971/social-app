const initialState = {
  usersPosts: [],
  newPost: null,
  getPostsStart: false,
  getPostsSuccess: false,
  postNewPostSuccess: false,
  postNewPostStart: false,
  likePostSuccess: false,
  likePostFail: false,
  dislikePostSuccess: false,
  dislikePostFail: false,
  createCommentForPostSuccess: false,
  createCommentForPostFail: false,
  loadMorePostsStart: false,
  loadMorePostsSuccess: false,
  loadMorePostsFail: false,
  loadMorePostsDone: false,
  loadMoreCommentsForPostsStart: false,
  loadMoreCommentsForPostsSuccess: false,
  loadMoreCommentsForPostsFail: false,
  loadMoreCommentsForPostsDone: false,
  loadedComments: [],
  errors: null
};

export default initialState;
