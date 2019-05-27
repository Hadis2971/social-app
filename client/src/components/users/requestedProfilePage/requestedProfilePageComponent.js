import React, { PureComponent } from 'react';
import RequestedProfilePosts from './profilePosts';
import Spinner from '../../standardLayout/spinner';
import Picture from '../../standardLayout/picture';

import './requestedProfilePage.css';

class RequestedProfilePageComponent extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      doneLoadingPosts: false
    };
  }

  async componentDidMount () {
    const { user } = this.props.location.state;
    const { getUsersProfilePage } = this.props.actions;
    await getUsersProfilePage(user);
  }

  render () {
    const { user } = this.props.location.state;
    const { getRequestedProfileStart, loadMoreRequsetdProfilePostsStart, loadMoreRequsetdProfilePostsDone, loadMoreRequsetdProfilePostsFail, currentUser } = this.props;
    let profileImage = null; let firstName = null; let lastName = null; let username = null; let posts = [];
    const { likePost, dislikePost, loadMorePostsForRequestedProfile } = this.props.actions;
    if (this.props.user) {
      profileImage = this.props.user.profileImage;
      firstName = this.props.user.firstName;
      lastName = this.props.user.lastName;
      username = this.props.user.username;
      posts = this.props.posts || [];
    }
    return (
      <div>
        {(getRequestedProfileStart && <Spinner />) ||
        <div id='requested-profile-box'>
          <Picture src={profileImage}>
            <p className='lead text-center requested-user-info'>First Name: {firstName}</p>
            <p className='lead text-center requested-user-info'>Last Name: {lastName}</p>
            <p className='lead text-center requested-user-info'>Username: {username}</p>
            <RequestedProfilePosts
              loadMoreRequsetdProfilePostsStart={loadMoreRequsetdProfilePostsStart}
              loadMoreRequsetdProfilePostsDone={loadMoreRequsetdProfilePostsDone}
              loadMoreRequsetdProfilePostsFail={loadMoreRequsetdProfilePostsFail}
              loadMorePostsForRequestedProfile={loadMorePostsForRequestedProfile}
              currentUser={currentUser}
              user={user}
              posts={posts}
              likePost={likePost}
              dislikePost={dislikePost} />
          </Picture>
        </div>
        }

      </div>
    );
  }
}

export default RequestedProfilePageComponent;
