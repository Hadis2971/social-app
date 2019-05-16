import React, { PureComponent } from 'react';
import Picture from '../../../standardLayout/picture';
import './request.css';

class Request extends PureComponent {
  constructor (props) {
    super(props);
    this.elementRef = React.createRef();
  }
  render () {
    const { src, firstName, lastName, id, acceptFriendRequest, declineFriendRequest } = this.props;
    return (
      <div ref={this.elementRef} className='request-box'>
        <Picture src={src}>
          <p>{firstName} {lastName}</p>
          <div className='btn-box'>
            <button onClick={() => acceptFriendRequest(id, this.elementRef.current)} className='btn btn-success' >Accept</button>
            <button onClick={() => declineFriendRequest(id, this.elementRef.current)} className='btn btn-danger' >Decline</button>
          </div>
        </Picture>
      </div>
    );
  }
}

export default Request;
