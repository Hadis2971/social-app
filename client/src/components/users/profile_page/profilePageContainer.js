import * as profileImageActions from '../../../redux/actions/profileImageActions/actionCreators';
import * as updateProfileActions from '../../../redux/actions/updateUserActions/actionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfilePageComponent from './profilePageComponent';

const mapStateToProps = (state) => {
  return {
    isFetchingPicture: state.profileImage.isFetchingPicture,
    profilePirctureURL: state.profileImage.profilePirctureURL,
    updateUserInfoStart: state.updateUser.updateUserInfoStart,
    user: state.updateUser.user,
    errors: state.updateUser.errors,
    updateUserInfoSuccess: state.updateUser.updateUserInfoSuccess,
    username: state.login.username,
    userEmail: state.login.userEmail,
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    fetchingSuccess: state.profileImage.fetchingSuccess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        ...profileImageActions,
        ...updateProfileActions
      },
      dispatch
    )
  };
};

const ProfilePageContainer = connect(mapStateToProps,
  mapDispatchToProps)(ProfilePageComponent);

export default ProfilePageContainer;
