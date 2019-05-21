import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersProfilePage, loadMorePostsForRequestedProfile } from '../../../state/actions/usersActions/usersAccounts';
import { likePost, dislikePost } from '../../../state/actions/twitterActions/postsActions/actionCreators';
import RequestedProfilePageComponent from './requestedProfilePageComponent';

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.usersProfilePage.user,
    posts: state.usersReducer.usersProfilePage.posts,
    getRequestedProfileStart: state.usersReducer.usersProfilePage.getRequestedProfileStart,
    getRequestedProfileFail: state.usersReducer.usersProfilePage.getRequestedProfileFail,
    getRequestedProfileSuccess: state.usersReducer.usersProfilePage.getRequestedProfileSuccess,
    loadMoreRequsetdProfilePostsStart: state.usersReducer.usersProfilePage.loadMoreRequsetdProfilePostsStart,
    loadMoreRequsetdProfilePostsSuccess: state.usersReducer.usersProfilePage.loadMoreRequsetdProfilePostsSuccess,
    loadMoreRequsetdProfilePostsFail: state.usersReducer.usersProfilePage.loadMoreRequsetdProfilePostsFail,
    loadMoreRequsetdProfilePostsDone: state.usersReducer.usersProfilePage.loadMoreRequsetdProfilePostsDone
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getUsersProfilePage,
        likePost,
        dislikePost,
        loadMorePostsForRequestedProfile
      },
      dispatch
    )
  };
};

const RequestedProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(RequestedProfilePageComponent);
export default RequestedProfilePageContainer;
