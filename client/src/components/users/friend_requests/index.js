import React from 'react';
import Request from './request';

import './friendRequests.css';

const FriendRequests = (props) => {
  let allRequests = null;

  allRequests = props.friendRequests.map(request => {
    return <Request
      confrimFriendRequestSuccess={props.confrimFriendRequestSuccess}
      acceptFriendRequest={props.acceptFriendRequest}
      declineFriendRequest={props.declineFriendRequest}
      key={request.id}
      id={request.id}
      src={request.profileImage}
      firstName={request.firstName}
      lastName={request.lastName} />;
  });
  allRequests = allRequests.length > 0 ? allRequests
    : <h2 className='text-center display-2'>No Friend Requests</h2>;
  return (
    <div id='friend-requests-box'>
      {allRequests}
    </div>
  );
};

export default FriendRequests;
