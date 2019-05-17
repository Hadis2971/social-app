import React from 'react';
import { Link } from 'react-router-dom';
import './comment.css';

const Comment = (props) => {
  const { user, profileImage, commentText, firstName, lastName } = props;
  return (
    <div className='comment-box'>
      <div className='img-comment-box'>
        <span className='comment-img'>
          <Link to={{ pathname: '/requestedProfile', state: { user: user } }}>
            <img src={profileImage} className='img-fluid' />
          </Link>
        </span>
        <span className='comment-text'>{commentText}</span>
      </div>
      <div className='info-section'>
        <span>{firstName}  </span>
        <span>{lastName}</span>
      </div>
    </div>
  );
};

export default Comment;
