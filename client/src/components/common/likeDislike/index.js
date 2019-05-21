import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
class LikeDislike extends PureComponent {
  render () {
    const { likeRef, likes, likePost, dislikeRef, dislikes, dislikePost, id } = this.props;
    return (
      <div>
        <div className='icon-up'>
          <span ref={likeRef} className='count-likes'>{likes}</span>
          <FontAwesomeIcon
            className='like-btn'
            icon={faThumbsUp}
            onClick={() => likePost(true, id, likeRef.current, dislikeRef.current)} />
        </div>
        <div className='icon-down'>
          <span ref={dislikeRef} className='count-dislikes'>{dislikes}</span>
          <FontAwesomeIcon
            className='dislike-btn'
            icon={faThumbsDown}
            onClick={() => dislikePost(false, id, likeRef.current, dislikeRef.current)} />
        </div>
      </div>
    );
  }
}

export default LikeDislike;
