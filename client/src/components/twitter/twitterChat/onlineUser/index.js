import React from 'react';

import './onlineUser.css';

const OnlineUser = (props) => {
  const { username, profileImage, openCloseChatBox } = props;
  return (
    <div className='online-friend-box' onClick={openCloseChatBox}>
      <img src={profileImage} className='img-fluid online-friend-image' />
      <p className='text-center lead info-online-friend'>{username}</p>
    </div>
  );
};

export default OnlineUser;
