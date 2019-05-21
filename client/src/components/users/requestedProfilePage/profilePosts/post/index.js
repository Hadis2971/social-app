import React, { PureComponent } from 'react';
import LikeDislike from '../../../../common/likeDislike';
import './requesteProfilePost.css';

class RequestedProfilePost extends PureComponent {
  constructor (props) {
    super(props);
    this.likeRefRequestedProfile = React.createRef();
    this.dislikeRefRequestedProfile = React.createRef();
  }

  render () {
    const { postText, likes, dislikes, id } = this.props;
    const { likePost, dislikePost } = this.props;
    return (
      <div className='requested-profile-post'>
        <p>{postText}</p>
        <LikeDislike
          likeRef={this.likeRefRequestedProfile}
          likes={likes}
          likePost={likePost}
          dislikeRef={this.dislikeRefRequestedProfile}
          dislikes={dislikes}
          dislikePost={dislikePost}
          id={id}
        />
      </div>
    );
  }
}

export default RequestedProfilePost;
