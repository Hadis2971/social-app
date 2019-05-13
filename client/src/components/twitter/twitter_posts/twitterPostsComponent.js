import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import Post from './post';
import Spinner from '../../standard_UI/spinner';
import Button from '../../standard_UI/button';
import './twitterPosts.css';

class TwitterPostsComponent extends Component {

  async componentDidMount () {
    const { getPosts } = this.props.actions;
    await getPosts();
  };

  submitNewPostHandler = (post, { resetForm }) => {
    const { postNewPost } = this.props.actions;
    const profileImage = localStorage.getItem('profileImage');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const newPost = {
      post: post.post,
      profileImage,
      firstName,
      lastName
    };
    postNewPost(newPost);
    resetForm();
  };

  render () {
    const { usersPosts, getPostsStart, createCommentForPostSuccess } = this.props;
    const { likePost, dislikePost, createCommnetForPost } = this.props.actions;
    const usersPostsArray = usersPosts.map(userPost => {
      return <Post 
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
    });
    return (
        <div className='col-lg-7'>
        {getPostsStart && <Spinner />}
        <div id='posts-box'>
        <h1 className='text-center display-2' id='feed-hdr'>Happenings Feed</h1>
          <ul id='posts-list'>
            {usersPostsArray}
          </ul>
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
