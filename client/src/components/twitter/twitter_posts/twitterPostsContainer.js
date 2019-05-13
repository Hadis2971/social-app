import TwitterPostsComponent from './twitterPostsComponent';
import * as postActionCreators from '../../../redux/actions/twitterActions/postsActions/actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    usersPosts: state.twitterPosts.usersPosts,
    getPostsStart: state.twitterPosts.getPostsStart,
    profilePirctureURL: state.profileImage.profilePirctureURL,
    createCommentForPostSuccess: state.twitterPosts.createCommentForPostSuccess
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
