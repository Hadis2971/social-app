import React from 'react';

import './loadMorePosts.css';

const LoadMorePosts = (props) => {
  const { loadMorePosts, done } = props;
  if (!done) {
    return (
      <p
        onClick={loadMorePosts}
        className='lead text-center my-3'
        id='load-more-posts-req-profile'>Load More Posts...</p>
    );
  } else {
    return (
      <p className='lead text-center my-3' id='load-more-posts-done-req-profile'>No More Posts To Load</p>
    );
  }
};

export default LoadMorePosts;
