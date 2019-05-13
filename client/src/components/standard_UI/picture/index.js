import React from 'react';
import './picture.css';

const Picture = (props) => {
  return (
    <div>
      <img id='profile-img' src={props.src} className='img-fluid' />
      {props.children}
    </div>
  );
};

export default Picture;
