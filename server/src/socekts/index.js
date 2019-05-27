import io from 'socket.io';

class SocketIO {
  constructor () {
    this.socket = io;
  }

  connectIO (server) {
    return io(server);
  }

  getSocket () {
    return this.socket;
  }
}
export default new SocketIO();
