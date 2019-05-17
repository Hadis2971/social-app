import React, { Component } from 'react';
import Spinner from '../../standardLayout/spinner';
import Errors from '../../common/errors';
import UserMsg from '../../common/userMsg';
import UserInfo from '../../users/userInfo';
import SearchForUserConatiner from '../../users/searchUsers/searchForUserContainer';
import FriendRequests from '../../users/friendRequests';

import { turnObjectIntoArray } from '../../../helpers';

import './twitterUser.css';

class TwitterComponent extends Component {
  async componentDidMount () {
    const { getUsersProfilePicture, getAllFriendRequests } = this.props.actions;
    await getUsersProfilePicture();
    await getAllFriendRequests();
  }

  render () {
    const {
      firstName,
      lastName,
      username,
      userEmail,
      profilePirctureURL,
      friendRequests,
      startFetchingFriendRequests,
      confrimFriendRequestSuccess,
      fetchingProfileImageSuccess,
      confrimFriendRequestFail,
      addNewFriendSuccess } = this.props;
    const { acceptFriendRequest, declineFriendRequest } = this.props.actions;
    return (
      <div id='twitter-box' className='row'>
        {startFetchingFriendRequests && <Spinner />}
        <div className='col-lg-5'>
          <UserInfo
            src={profilePirctureURL}
            firstName={firstName}
            lastName={lastName}
            username={username}
            userEmail={userEmail}
            fetchingProfileImageSuccess={fetchingProfileImageSuccess} />
          <SearchForUserConatiner />
          {addNewFriendSuccess && <UserMsg msgType='alert-success' message='Request Sent' />}
        </div>
        <div className='col-lg-7'>
          {confrimFriendRequestSuccess && <UserMsg msgType='alert-success' message='Everything Went Well' />}
          {confrimFriendRequestFail && <Errors errors='Something Went Wrong Please Try Again!!!' />}
          <FriendRequests
            acceptFriendRequest={acceptFriendRequest}
            declineFriendRequest={declineFriendRequest}
            friendRequests={turnObjectIntoArray(friendRequests)}
          />
        </div>
      </div>
    );
  }
}

export default TwitterComponent;
