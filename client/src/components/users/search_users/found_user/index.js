import React, { PureComponent } from 'react';
import Picture from '../../../standard_UI/picture';

import './foundUser.css';

class FoundUser extends PureComponent {
  constructor (props) {
    super(props);
    this.elementRef = React.createRef();
  }

  render () {
    const userID = (localStorage.getItem('userID') - 0);
    const { id, friend, foundUserID, src, firstName, lastName, addNewFriend } = this.props;
    const users = {
      requestingUser: (id - 0),
      requestedUser: foundUserID
    };
    let btn = (userID === foundUserID) ? null : <button className='btn btn-success' onClick={() => addNewFriend(users, this.elementRef.current)}>Add Friend</button>;
    if (friend) btn = <span style={{ color: 'green' }}>Friends&#10003;</span>;
    return (
      <div ref={this.elementRef} className='found-user-box'>
        <Picture src={src}>
          <p>{firstName} {lastName}</p>
          {btn}
        </Picture>
      </div>
    );
  }
}

export default FoundUser;
