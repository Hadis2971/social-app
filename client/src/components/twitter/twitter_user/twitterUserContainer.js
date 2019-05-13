import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersProfilePicture } from '../../../redux/actions/profileImageActions/actionCreators';
import { getAllFriendRequests, acceptFriendRequest, declineFriendRequest } from '../../../redux/actions/firendsActions/actionCreators';
import TwitterUserComponent from './twitterUserComponent';

const mapStateToProps = (state) => {
  return {
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    username: state.login.username,
    userEmail: state.login.userEmail,
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
