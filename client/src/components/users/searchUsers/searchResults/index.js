import React from 'react';
import FoundUser from '../foundUser';
import './searchResults.css';

const SearchResults = (props) => {
  const foundUsersArr = props.foundUsers.map(user => {
    return <FoundUser
      addNewFriend={props.addNewFriend}
      foundUserID={user.id}
      id={props.userID}
      key={user.id}
      src={user.profileImage}
      firstName={user.firstName}
      lastName={user.lastName}
      friend={user.friend}
    />;
  });
  return (
    <div id='search-results-box' className='my-3'>
      {foundUsersArr}
    </div>
  );
};

export default SearchResults;
