import React, { Component } from 'react';
import NotifyItem from './item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';

import './notifications.css';

class Notifications extends Component {
  render () {
    return (
      <div className='dropdown'>
        <button className='btn dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <FontAwesomeIcon icon={faSurprise} className='icon' />
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          
        </div>
      </div>
    );
  }
}

export default Notifications;
