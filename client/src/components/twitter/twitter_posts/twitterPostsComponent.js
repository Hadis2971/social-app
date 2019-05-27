import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import Post from './post';
import Errors from '../../common/errors';
import LoadMorePosts from '../../common/loadMorePosts';
import Notifications from '../../../sockets/notifications';
import Spinner from '../../standardLayout/spinner';
import Button from '../../standardLayout/button';
import { getDataFromLocalStorage } from '../../../helpers';
import './twitterPosts.css';

class TwitterPostsComponent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      offset: 5,
      errors: null,
      usersPostsList: []
    };
  }

  async componentDidMount () {
    const { getPosts } = this.props.actions;
    const getPostsSuccess = await getPosts();
    if (getPostsSuccess) {
      this.setUsersPosts(getPostsSuccess);
    }
  };

  componentWillReceiveProps (nextProps) {
    const { usersPosts } = this.props;
    if (nextProps.usersPosts.length !== usersPosts.length) {
      this.setUsersPosts(nextProps.usersPosts);
    }
  }

  setUsersPosts = (usersPosts) => {
    const { createCommentForPostSuccess, loadMoreCommentsForPostsFail, loadMoreCommentsForPostsDone, currentUser } = this.props;
    const { likePost, dislikePost, createCommnetForPost, loadMoreCommentsForPost } = this.props.actions;
    this.setState({
      usersPostsList: usersPosts.map(userPost => {
        return <Post 
          currentUser={currentUser}
          loadMoreCommentsForPost={loadMoreCommentsForPost}
          loadMoreCommentsForPostsFail={loadMoreCommentsForPostsFail}
          loadMoreCommentsForPostsDone={loadMoreCommentsForPostsDone}
          comments={userPost.comments}
          userPost={userPost}
          postText={userPost.postText} 
          firstName={userPost.firstName}
          lastName={userPost.lastName}
          profileImage={userPost.profileImage}
          likes={userPost.likes || 0}
          dislikes={userPost.dislikes || 0}
          key={userPost.id} 
          id={userPost.id}
          likePost={likePost}
          dislikePost={dislikePost}
          createCommentForPostSuccess={createCommentForPostSuccess}
          createCommnetForPost={createCommnetForPost}
        />
      })
    });
  };

  submitNewPostHandler = (post, { resetForm }) => {
    const { postNewPost } = this.props.actions;
    const newPost = 
    Object.assign({post: post.post}, 
    getDataFromLocalStorage({'profileImage': null, 'firstName': null, 'lastName': null}));
    postNewPost(newPost);
    resetForm();
  };

  loadMorePostsWithOffset = async () => {
    const { loadMorePosts } = this.props.actions;
    const { user } = this.props;
    const { offset } = this.state;
    const loadMorePostsSuccess = await loadMorePosts(user, offset);
    if (loadMorePostsSuccess) {
      this.setState((prevState) => ({
        offset: prevState.offset += 5
      }));
    } else {
      this.setState({
        errors: true
      });
    }
  }

  render () {
    const { usersPostsList, errors } = this.state;
    const { getPostsStart, loadMorePostsDone, loadMorePostsFail, usersPosts } = this.props;
    return (
        <div className='col-lg-7'>
        {getPostsStart && <Spinner />}
        <div id='posts-box'>
        <h1 className='text-center display-2' id='feed-hdr'>Happenings Feed</h1>
          <ul id='posts-list'>
            {usersPostsList}
          </ul>
          {(loadMorePostsFail || errors) && <Errors errors='Something Went Wrong Could Not Load More Posts Please Try Again!!!' />}
          <LoadMorePosts 
          loadMorePosts={this.loadMorePostsWithOffset}
          user={null}
          done={loadMorePostsDone}
          />
        </div>
        <Formik
          onSubmit={this.submitNewPostHandler}
          initialValues={{ post: '' }}
          render={(props) => {
            return (
              <Form>
                <div className='form-group'>
                  <Field
                    name='post'
                    className='form-control'
                    type='text'
                    placeholder='New Post'
                  />
                </div>
                <Button
                  btnType='submit'
                  btnClass='btn btn-primary'
                  btnText='Add Post'
                />
              </Form>
            );
          }}
        />
       </div>
    );
  }
}

export default TwitterPostsComponent;
