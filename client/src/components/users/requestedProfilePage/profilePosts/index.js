import React from 'react';
import RequestedProfilePost from './post';
const RequestedProfilePosts = (props) => {
  const { posts } = props;
  const { likePost, dislikePost } = props;
  const finalPosts = posts.map(post => {
    return <RequestedProfilePost
      key={post.id}
      postText={post.postText}
      likes={post.likes}
      dislikes={post.dislikes}
      likePost={likePost}
      dislikePost={dislikePost}
    />;
  });
  return finalPosts;
};

export default RequestedProfilePosts;
