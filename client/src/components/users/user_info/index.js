import React from 'react';
import Errors from '../../common/errors';
import './userInfo.css';

const UserInfo = (props) => {
  return (
    <div id='user-info-box'>
      <h3 id='user-info-hdr'>Profile Information</h3>
      {(!props.fetchingProfileImageSuccess) && <Errors errors='Failed To Load Profile Picture' />}
      <img src={props.src} className='img-fluid mb-3' />
      <p className='lead info'>First Name: {props.firstName}</p>
      <p className='lead info'>Last Name: {props.lastName}</p>
      <p className='lead info'>Username: {props.username}</p>
      <p className='lead info'>Email Address: {props.userEmail}</p>
    </div>
  );
};

export default UserInfo;
