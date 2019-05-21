import React from 'react';

import './loadMoreComments.css';

const LoadMoreComments = (props) => {
  const { loadMoreComments, done } = props;
  if (!done) {
    return (
      <p
        onClick={loadMoreComments}
        className='lead text-center my-3 load-more-commnets-for-post'>
        Load More Comments...</p>
    );
  } else {
    return (
      <p className='lead text-center load-more-comments-for-post-done my-3'>No More Comments To Load</p>
    );
  }
};

export default LoadMoreComments;
