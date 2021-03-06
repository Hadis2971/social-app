import LoggedInUsers from '../database/models/LoggedInUsers';
import usersDAL from '../app/users/usersDAL';
import Users from '../database/models/Users';
class NotificationSocket {
  userLoggedInNotify (socket) {
    socket.on('userLogin', (user) => {
      socket.join(user.userID);
      LoggedInUsers.create({
        user: user.userID,
        username: user.username,
        profileImage: user.profileImage
      });
    });
  }

  likeDislikeCommentNotify (socket, io) {
    socket.on('userLike', async (ids) => {
      const userOnline = await usersDAL.checkIfUserIsLoggedIn(ids.userID);
      if (userOnline) {
        const user = await Users.findOne({ where: { id: ids.currentUser } });
        io.sockets.in(ids.userID).emit('postLiked', { firstName: user.firstName, lastName: user.lastName });
      }
    });

    socket.on('userDislike', async (ids) => {
      const userOnline = await usersDAL.checkIfUserIsLoggedIn(ids.userID);
      if (userOnline) {
        const user = await Users.findOne({ where: { id: ids.currentUser } });
        io.sockets.in(ids.userID).emit('postDisliked', { firstName: user.firstName, lastName: user.lastName });
      }
    });

    socket.on('userComment', async (ids) => {
      const userOnline = await usersDAL.checkIfUserIsLoggedIn(ids.userID);
      if (userOnline) {
        const user = await Users.findOne({ where: { id: ids.currentUser } });
        io.sockets.in(ids.userID).emit('postCommented', { firstName: user.firstName, lastName: user.lastName });
      }
    });
  }
}

export default new NotificationSocket();
