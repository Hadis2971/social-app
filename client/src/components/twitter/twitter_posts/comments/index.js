import React, { Component } from 'react';
import Comment from './comment';
import CommentForm from './commentForm';
class Comments extends Component {
  constructor (props) {
    super(props);
    this.state = {
      commentsForPost: []
    };
  }

  componentDidMount () {
    const { comments } = this.props;
    if (this.state.commentsForPost.length <= 0 && comments) {
      this.setState({
        commentsForPost: [...comments]
      });
    }
  }

  addComment = (comment) => {
      let { userPost } = this.props;
      let helpArr = [...this.state.commentsForPost];
      helpArr.push(comment);
      if (userPost.comments) {
        userPost.comments.push(comment);
      } else {
        userPost.comments = [];
        userPost.comments.push(comment);
      }
      this.setState({
        commentsForPost: [...userPost.comments]
      });
  }

  render () {
    const { commentsForPost } = this.state;
    const { createCommnetForPost, id, createCommentForPostSuccess, userPost } = this.props;
    let commentsArr = null;
    if (userPost.comments) {
      commentsArr = userPost.comments.map(comment => {
        return <Comment
          key={comment.id}
          profileImage={comment.profileImage}
          commentText={comment.comment}
          firstName={comment.firstName}
          lastName={comment.lastName}
        />;
      });
    }
    return (
      <div>
        {commentsArr}
        <CommentForm
          createCommnetForPost={createCommnetForPost}
          id={id}
          createCommentForPostSuccess={createCommentForPostSuccess}
          addComment={this.addComment}
        />
      </div>
    );
  }
}

export default Comments;
