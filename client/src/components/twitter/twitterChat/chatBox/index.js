import React, { PureComponent } from 'react';

import './chatBox.css';

class ChatBox extends PureComponent {
  render () {
    const { openCloseChatBox } = this.props;
    return (

      <div className='modal-dialog modal-style' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Modal title</h5>
            <button type='button' onClick={openCloseChatBox} className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body my-3'>
            <div className='messages' />
            <div className='form-group'>
              <input type='text' className='form-control' name='chatMessage' />
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' onClick={openCloseChatBox} className='btn btn-secondary' data-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-primary'>Save changes</button>
          </div>
        </div>
      </div>

    );
  }
}

export default ChatBox;
