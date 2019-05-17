import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './requesteProfilePost.css';

class RequestedProfilePost extends PureComponent {

  constructor (props) {
    super(props);
    this.likeRef = React.createRef();
    this.dislikeRef = React.createRef();
  }

  render () {
    const { postText, likes, dislikes } = this.props;
    const { likePost, dislikePost } = this.props;
    return (
      <div className='requested-profile-post'>
        <p>{postText}</p>
        <div className='icon-up-requested-profile-page'>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span className='requested-profile-page-like-count'>{likes}</span>
        </div>
        <div className='icon-down-requested-profile-page'>
          <FontAwesomeIcon icon={faThumbsDown} />
          <span className='requested-profile-page-dislike-count'>{dislikes}</span>
        </div>
      </div>
    );
  }
}

export default RequestedProfilePost;
