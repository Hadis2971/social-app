import socketIOClient from 'socket.io-client';
import { baseUrlForSockets } from '../../config';

class SocketIO {
  constructor () {
    this.userID = localStorage.getItem('userID');
  }
  socket (path = '') {
    return socketIOClient(`${baseUrlForSockets}${path}`);
  }
}

export default SocketIO;
