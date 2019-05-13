import React, { Component } from 'react';
import Spinner from '../../standard_UI/spinner';
import Errors from '../../common/errors';
import UserMsg from '../../common/userMsg';
import UserInfo from '../../users/user_info';
import SearchForUserConatiner from '../../users/search_users/searchForUserContainer';
import FriendRequests from '../../users/friend_requests';

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
    console.log(confrimFriendRequestSuccess);
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
