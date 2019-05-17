import React, { Component } from 'react';
import RequestedProfilePosts from './profilePosts';
import Spinner from '../../standardLayout/spinner';
import Picture from '../../standardLayout/picture';

import './requestedProfilePage.css';

class RequestedProfilePageComponent extends Component {
  async componentDidMount () {
    const { user } = this.props.location.state;
    const { getUsersProfilePage } = this.props.actions;
    await getUsersProfilePage(user);
  }

  render () {
    const { getRequestedProfileStart } = this.props;
    let profileImage = null, firstName = null, lastName = null, username = null, posts = null;
    const { likePost, dislikePost } = this.props.actions;
    if (this.props.user) {
      profileImage = this.props.user.profileImage;
      firstName = this.props.user.firstName;
      lastName = this.props.user.lastName;
      username = this.props.user.username;
      posts = this.props.user.posts;
    }
    return (
      <div>
        {(getRequestedProfileStart && <Spinner />) ||
        <div id='requested-profile-box'>
          <Picture src={profileImage}>
            <p className='lead text-center requested-user-info'>First Name: {firstName}</p>
            <p className='lead text-center requested-user-info'>Last Name: {lastName}</p>
            <p className='lead text-center requested-user-info'>Username: {username}</p>
            <RequestedProfilePosts posts={posts || []} likePost={likePost} dislikePost={dislikePost} />
          </Picture>
        </div>
        }

      </div>
    );
  }
}

export default RequestedProfilePageComponent;
