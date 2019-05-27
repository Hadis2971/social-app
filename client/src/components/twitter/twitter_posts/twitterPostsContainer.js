import TwitterPostsComponent from './twitterPostsComponent';
import * as postActionCreators from '../../../state/actions/twitterActions/postsActions/actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.login.userID,
    usersPosts: state.twitterPosts.usersPosts,
    getPostsStart: state.twitterPosts.getPostsStart,
    loadMorePostsFail: state.twitterPosts.loadMorePostsFail,
    loadMorePostsDone: state.twitterPosts.loadMorePostsDone,
    profilePirctureURL: state.profileImage.profilePirctureURL,
    createCommentForPostSuccess: state.twitterPosts.createCommentForPostSuccess,
    loadMoreCommentsForPostsStart: state.twitterPosts.loadMoreCommentsForPostsStart,
    loadMoreCommentsForPostsSuccess: state.twitterPosts.loadMoreCommentsForPostsSuccess,
    loadMoreCommentsForPostsFail: state.twitterPosts.loadMoreCommentsForPostsFail,
    loadMoreCommentsForPostsDone: state.twitterPosts.loadMoreCommentsForPostsDone
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        ...postActionCreators
      },
      dispatch
    )
  };
};

const TwitterPostsContainer = connect(mapStateToProps, mapDispatchToProps)(TwitterPostsComponent);

export default TwitterPostsContainer;
