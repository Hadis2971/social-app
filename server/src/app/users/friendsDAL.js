import Users from '../../database/models/Users';
import Friends from '../../database/models/Friends';
import FriendRequests from '../../database/models/FriendRequests';
import LoggedInUsers from '../../database/models/LoggedInUsers';
import usersHelpers from '../../helpers/usersHelpers';
import friendsHelpers from '../../helpers/friedsHelpers';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class AccessFriendsData {
  async getAllFriendRequests (req, res, next) {
    try {
      const allRequestingUsers = await FriendRequests.findAll({ where: { requestedUser: req.decoded.userID } });
      const usersArray = friendsHelpers.extractRequestingUserIds(allRequestingUsers);
      const allUsers = await Users.findAll({ where: { id: { [Op.in]: usersArray } } });
      const resultArray = usersHelpers.createUsersResultArray(allUsers);
      res.json(resultArray);
    } catch (error) {
      next(error);
    }
  }

  async addNewFriend (req, res, next) {
    try {
      await FriendRequests.create(req.body);
      res.json({ Success: true });
    } catch (error) {
      next(error);
    }
  }

  async confrimFriendRequest (req, res, next) {
    const { confirm, requestingUser } = req.body;
    const requestedUser = req.decoded.userID;
    if (!confirm) {
      try {
        await FriendRequests.destroy({
          where: {
            [Op.and]: [
              {
                requestingUser: requestingUser
              },
              {
                requestedUser: requestedUser
              }
            ]
          }
        });
        res.json(true);
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const request = await FriendRequests.findOne({
          where: {
            [Op.and]: [
              {
                requestingUser: requestingUser
              },
              {
                requestedUser: requestedUser
              }
            ]
          }
        });
        await request.update({
          accepted: true
        });
        await request.destroy();
        res.json(true);
      } catch (error) {
        next(error);
      }
    }
  }

  async getOnlineFriends (req, res, next) {
    const { userID } = req.params;
    try {
      const friends = await Friends.findAll({
        where: {
          [Op.or]: [
            {
              friendOne: userID
            },
            {
              friendTwo: userID
            }
          ]
        }
      });
      const friendsArr = friendsHelpers.getFriendsID(friends, null);
      const onlineFriends = await LoggedInUsers.findAll({
        where: {
          [Op.and]: [
            {
              user: { [Op.not]: userID }
            },
            {
              user: { [Op.in]: friendsArr }
            }
          ]
        }
      });
      res.json(onlineFriends);
    } catch (error) {
      console.log('find friends error', error);
      next(error);
    }
  }
}

export default new AccessFriendsData();
