import React from 'react';

const UserMsg = (props) => {
  return (
    <div className={'alert ' + props.msgType}>{props.message}</div>
  );
};

export default UserMsg;
