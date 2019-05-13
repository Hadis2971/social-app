import Users from '../../database/models/Users';
import FriendRequests from '../../database/models/FriendRequests';
import Friends from '../../database/models/Friends';
import { createUsersResultArray, extractRequestingUserIds, getFriendsID, finalSearchUsersResult } from '../../helpers';
import { checkIfEmailExists } from '../auth/checkUsers';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class AccessUsersData {
  async getAllFriendRequests (req, res, next) {
    try {
      const allRequestingUsers = await FriendRequests.findAll({ where: { requestedUser: req.decoded.userID } });
      const usersArray = extractRequestingUserIds(allRequestingUsers);
      const allUsers = await Users.findAll({ where: { id: { [Op.in]: usersArray } } });
      const resultArray = createUsersResultArray(allUsers);
      res.json(resultArray);
    } catch (error) {
      next(error);
    }
  }

  async getProfilePictureUrl (req, res, next) {
    try {
      const user = await Users.findOne({ where: { id: req.decoded.userID } });
      res.json({ url: user.profileImage });
    } catch (error) {
      next(error);
    }
  }

  updateUserProfile (req, res, next) {
    if (req.filename) {
      req.body.profileImage = req.filename;
    }
    if ((!checkIfEmailExists(req.body.userEmail)) && req.body.userEmail !== req.decoded.userEmail) return res.json({ Error: 'Email Already Exists' });
    Users.update(
      req.body,
      { where: { id: req.decoded.userID } }
    )
      .then(() => {
        res.json(req.body);
      }
      )
      .catch((error) =>
        next(error)
      );
  }

  async getAllSearchedUsers (req, res, next) {
    const { searchTerm } = req.body;
    const { userID } = req.decoded;
    try {
      const foundUsers = await Users.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `${searchTerm}%`
              }
            },
            {
              lastName: {
                [Op.like]: `${searchTerm}%`
              }
            }
          ]
        }
      });
      if (foundUsers.length) {
        const usersResultArr = createUsersResultArray(foundUsers);
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
        const friendsIds = getFriendsID(friends, userID);
        finalSearchUsersResult(usersResultArr, friendsIds);
        return res.json(usersResultArr);
      }
      res.json({
        Error: 'No Match Found!!!'
      });
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
}

export default new AccessUsersData();
