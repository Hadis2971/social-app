import React from 'react';
import Picture from '../../../standardLayout/picture';
import './item.css';

const NotifyItem = (props) => {
  const { profileImage, firstName, lastName, username } = props;
  return (
    <div>
      <Picture src={profileImage}>
        <div>
          {firstName} {lastName} {username}
        </div>
      </Picture>
    </div>
  );
};

export default NotifyItem;
