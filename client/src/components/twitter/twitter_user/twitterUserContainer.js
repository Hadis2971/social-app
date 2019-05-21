import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersProfilePicture } from '../../../state/actions/profileImageActions/actionCreators';
import { getAllFriendRequests, acceptFriendRequest, declineFriendRequest } from '../../../state/actions/firendsActions/actionCreators';
import TwitterUserComponent from './twitterUserComponent';

const mapStateToProps = (state) => {
  return {
    firstName: state.authReducer.login.firstName,
    lastName: state.authReducer.login.lastName,
    username: state.authReducer.login.username,
    userEmail: state.authReducer.login.userEmail,
    fetchingProfileImageSuccess: state.profileImage.fetchingSuccess,
    profilePirctureURL: state.profileImage.profilePirctureURL,
    friendRequests: state.friendsReducer.friendRequests,
    startFetchingFriendRequests: state.friendsReducer.startFetchingFriendRequests,
    confirmRequestErrors: state.friendsReducer.errors,
    addNewFriendSuccess: state.friendsReducer.addNewFriendSuccess,
    confrimFriendRequestSuccess: state.friendsReducer.confrimFriendRequestSuccess,
    confrimFriendRequestFail: state.friendsReducer.confrimFriendRequestFail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getUsersProfilePicture,
        getAllFriendRequests,
        acceptFriendRequest,
        declineFriendRequest
      },
      dispatch
    )
  };
};

const TwitterUserContainer = connect(mapStateToProps, mapDispatchToProps)(TwitterUserComponent);

export default TwitterUserContainer;
