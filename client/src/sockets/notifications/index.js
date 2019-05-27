import SocketIO from '../socketIO';

class Notifications extends SocketIO {
  constructor () {
    super();
    this.authLoginPath = '/auth/login';
  }

  userLoggedInNotify (user) {
    return this.socket(this.authLoginPath).emit('userLogin', user);
  }

  userLikeNotify (userID, currentUser) {
    return this.socket('').emit('userLike', { userID, currentUser });
  }

  likePostNotify () {
    return this.socket('').on('postLiked', () => console.log('your post was liked'));
  }

  userDislikeNotify (userID, currentUser) {
    return this.socket('').emit('userDislike', { userID, currentUser });
  }

  userCommentNotify (userID, currentUser) {
    return this.socket('').emit('userComment', { userID, currentUser });
  }

  userDisconnect () {
    return this.socket(this.authLoginPath).emit('disconnect');
  }
}

export default new Notifications();
