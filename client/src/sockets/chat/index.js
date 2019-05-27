import SocketIO from '../socketIO';

class Chat extends SocketIO {
  constructor () {
    super();
    this.baseUrl = '/chat';
  }

  messageRecived () {
    return this.socket(this.baseUrl).on('message');
  }
}

export default new Chat();
