import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../comments';
import LikeDislike from '../../../common/likeDislike';
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
    const { showComments } = this.state;
    const { profileImage,
      currentUser,
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
      loadMoreCommentsForPost,
      loadMoreCommentsForPostsFail,
      loadMoreCommentsForPostsDone,
      userPost } = this.props;
    return (
      <div className='post-comment-section'>
        <div className='post-box'>
          <div className='img-post-box'>
            <span className='img-box'><Link to={{pathname: '/requestedProfile', state: {user: userPost.user}}}><img src={profileImage} className='img-fluid post-img' /></Link></span>
            <span className='lead postText'>{postText}</span>
          </div>
          <div className='user-information'>
            {firstName} {lastName}
          </div>
          
          <LikeDislike 
          likeRef={this.likeRef}
          likes={likes}
          likePost={likePost}
          dislikeRef={this.dislikeRef}
          dislikes={dislikes}
          dislikePost={dislikePost}
          userToNotify={userPost.user}
          currentUser={currentUser}
          id={id}
          />
        </div>
        <p onClick={this.showHideComments} className='text-center show-comments'>{(this.state.showComments) ? 'Hide Comments' : 'Show Comments'}</p>
        {showComments && 
        <Comments 
        loadMoreCommentsForPost={loadMoreCommentsForPost}
        loadMoreCommentsForPostsFail={loadMoreCommentsForPostsFail}
        loadMoreCommentsForPostsDone={loadMoreCommentsForPostsDone}
        userPost={userPost}
        createCommentForPostSuccess={createCommentForPostSuccess} 
        comments={comments} 
        createCommnetForPost={createCommnetForPost} 
        userToNotify={userPost.user}
        currentUser={currentUser}
        id={id} />
        }
      </div>
    );
  }
}

export default Post; 
