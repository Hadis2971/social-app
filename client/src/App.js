import React, { PureComponent } from 'react';
import Routes from './components/routes';
import socketIOClient from 'socket.io-client';
import Noty from 'noty';
import notifications from './sockets/notifications';

import '../node_modules/noty/lib/noty.css';
import '../node_modules/noty/lib/themes/mint.css';

class App extends PureComponent {
  render () {
    const socket = socketIOClient('http://localhost:5000/');
    const userID = localStorage.getItem('userID');
    if (userID) {
      socket.emit('join', { userID });
    }
    socket.on('postLiked', (user) => {
      console.log(user);
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: `${user.firstName} ${user.lastName} Liked Your Post`
      }).show();

      console.log('your post was liked');
    });

    socket.on('postDisliked', (user) => {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: `${user.firstName} ${user.lastName} Disliked Your Post`
      }).show();
      console.log('your post was disliked');
    });

    socket.on('postCommented', (user) => {
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: `${user.firstName} ${user.lastName} Commented On Your Post`
      }).show();
      console.log('your post was commented');
    });

    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
