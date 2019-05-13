import React from 'react';

import './comment.css';

const Comment = (props) => {
  return (
    <div className='comment-box'>
      <div className='img-comment-box'>
        <span className='comment-img'><img src={props.profileImage} className='img-fluid' /></span>
        <span className='comment-text'>{props.commentText}</span>
      </div>
      <div className='info-section'>
        <span>{props.firstName}  </span>
        <span>{props.lastName}</span>
      </div>
    </div>
  );
};

export default Comment;
