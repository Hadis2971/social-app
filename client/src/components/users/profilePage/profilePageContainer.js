import * as profileImageActions from '../../../state/actions/profileImageActions/actionCreators';
import * as updateProfileActions from '../../../state/actions/usersActions/usersAccounts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfilePageComponent from './profilePageComponent';

const mapStateToProps = (state) => {
  return {
    isFetchingPicture: state.profileImage.isFetchingPicture,
    profilePirctureURL: state.profileImage.profilePirctureURL,
    updateUserInfoStart: state.usersReducer.updateAccount.updateUserInfoStart,
    user: state.usersReducer.usersProfilePage.user,
    errors: state.usersReducer.updateAccount.errors,
    updateUserInfoSuccess: state.usersReducer.updateAccount.updateUserInfoSuccess,
    username: state.authReducer.login.username,
    userEmail: state.authReducer.login.userEmail,
    firstName: state.authReducer.login.firstName,
    lastName: state.authReducer.login.lastName,
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
