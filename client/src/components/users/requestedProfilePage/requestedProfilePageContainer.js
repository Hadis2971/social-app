import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersProfilePage } from '../../../redux/actions/usersActions/usersAccounts';
import { likePost, dislikePost } from '../../../redux/actions/twitterActions/postsActions/actionCreators';
import RequestedProfilePageComponent from './requestedProfilePageComponent';

const mapStateToProps = (state) => {
  return {
    user: state.usersAccoutsReducer.user,
    getRequestedProfileStart: state.usersAccoutsReducer.getRequestedProfileStart,
    getRequestedProfileFail: state.usersAccoutsReducer.getRequestedProfileFail,
    getRequestedProfileSuccess: state.usersAccoutsReducer.getRequestedProfileSuccess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getUsersProfilePage,
        likePost,
        dislikePost
      },
      dispatch
    )
  };
};

const RequestedProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(RequestedProfilePageComponent);
export default RequestedProfilePageContainer;
