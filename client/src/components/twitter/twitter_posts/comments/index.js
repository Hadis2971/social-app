import React, { Component } from 'react';
import Comment from './comment';
import CommentForm from './commentForm';
import LoadMoreComments from '../../../common/loadMoreComments';
import Errors from '../../../common/errors';
import postsHelpers from '../../../../helpers/postsHelpers';
class Comments extends Component {
  constructor (props) {
    super(props);
    this.state = {
      commentsForPost: [],
      commnetsList: [],
      offset: 5,
      doneLoadingComments: false,
      errors: null
    };
  }

  componentDidMount () {
    const { comments } = this.props;
    if (this.state.commentsForPost.length <= 0 && comments) {
      this.setState({
        commentsForPost: [...comments],
        offset: comments.length
      });
    }
  }

  loadMoreCommentsWithOffset = async () => {
    const { commentsForPost, offset } = this.state;
    const { loadMoreCommentsForPost, userPost } = this.props;
    let helpArr = [...commentsForPost];
    const newComments = await loadMoreCommentsForPost(userPost.id, offset);
    helpArr = helpArr.concat(newComments);
    userPost.comments = [...helpArr];
    if (newComments.length > 0) {
      this.setState((prevState) => ({
        commentsForPost: [...helpArr],
        errors: null,
        offset: prevState.offset += 5
      }));
    } else {
      this.setState({
        doneLoadingComments: true
      });
    }
  };

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
    const { commentsForPost, offset, doneLoadingComments } = this.state;
    const { createCommnetForPost, id, createCommentForPostSuccess, userPost, loadMoreCommentsForPostsFail } = this.props;
    let commentsArr = null;
    if (userPost.comments) {
      commentsArr = commentsForPost.map(comment => {
        return <Comment
          key={comment.id}
          user={comment.user}
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
        {loadMoreCommentsForPostsFail && <Errors errors='Something Went Wrong Please Try Again!!!' />}
        <LoadMoreComments 
        loadMoreComments={this.loadMoreCommentsWithOffset}
        done={doneLoadingComments}
        offset={offset}
        />
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
