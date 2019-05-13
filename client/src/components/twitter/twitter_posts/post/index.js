import React, { PureComponent } from 'react';
import Comments from '../comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './post.css';

class Post extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      showComments: false
    };
    this.likeRef = React.createRef();
    this.dislikeRef = React.createRef();
  }

  showHideComments = () => {
    this.setState((prevState) => ({
      showComments: (!prevState.showComments)
    }));
  };

  render () {
    const { profileImage,
      id,
      postText,
      firstName,
      lastName,
      likes,
      dislikes,
      likePost,
      dislikePost,
      comments,
      createCommentForPostSuccess,
      createCommnetForPost,
      userPost } = this.props;
    let commentsComponent = (this.state.showComments)
      ? <Comments 
          userPost={userPost}
          createCommentForPostSuccess={createCommentForPostSuccess} 
          comments={comments} 
          createCommnetForPost={createCommnetForPost} 
          id={id} />
      : null;

    return (
      <div className='post-comment-section'>
        <div className='post-box'>
          <div className='img-post-box'>
            <span className='img-box'><img src={profileImage} className='img-fluid post-img' /></span>
            <span className='lead postText'>{postText}</span>
          </div>
          <div className='user-information'>
            {firstName} {lastName}
          </div>
          <div className='icon-up'>
            <span ref={this.likeRef} className='count-likes'>{likes}</span>
            <FontAwesomeIcon icon={faThumbsUp} onClick={() => likePost(true, id, this.likeRef.current, this.dislikeRef.current)} />
          </div>
          <div className='icon-down'>
            <span ref={this.dislikeRef} className='count-dislikes'>{dislikes}</span>
            <FontAwesomeIcon icon={faThumbsDown} onClick={() => dislikePost(false, id, this.likeRef.current, this.dislikeRef.current)} />
          </div>
        </div>
        <p onClick={this.showHideComments} className='text-center show-comments'>{(this.state.showComments) ? 'Hide Comments' : 'Show Comments'}</p>
        {commentsComponent}
      </div>
    );
  }
}

export default Post;
