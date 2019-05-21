import React, { PureComponent } from 'react';
import Spinner from '../../standardLayout/spinner';
import UpdateUserInfo from './updateUserProfile';

import './profilePage.css';

class ProfilePageComponent extends PureComponent {
  async componentDidMount () {
    const { getUsersProfilePicture } = this.props.actions;
    await getUsersProfilePicture();
  }

  render () {
    const {
      isFetchingPicture,
      profilePirctureURL,
      updateUserInfoStart,
      updateUserInfoSuccess,
      username,
      userEmail,
      firstName,
      lastName,
      errors,
      fetchingSuccess } = this.props;

    const { updateUserInfo } = this.props.actions;
    return (
      <div>
        {updateUserInfoStart && <Spinner />}
        <div id='profile-image-box'>
          <UpdateUserInfo
            username={username}
            userEmail={userEmail}
            firstName={firstName}
            lastName={lastName}
            fetchingSuccess={fetchingSuccess}
            errors={errors}
            updateUserInfo={updateUserInfo}
            src={profilePirctureURL}
            isFetchingPicture={isFetchingPicture}
            updateUserInfoSuccess={updateUserInfoSuccess}
          />
        </div>
      </div>
    );
  }
}

export default ProfilePageComponent;
