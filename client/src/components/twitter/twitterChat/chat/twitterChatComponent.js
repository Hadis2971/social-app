import React, { Component } from 'react';

class ChatComponent extends Component {
  render () {
    return (
      <div className='col-lg-5' >
        <div id='chat-box'>
          <div>
            wqqwqw
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='chat-msg'
              className='form-control'
              placeholder='New message'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatComponent;
