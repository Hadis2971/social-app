import Users from '../../database/models/Users';
import Friends from '../../database/models/Friends';
import LoggedInUsers from '../../database/models/LoggedInUsers';
import usersServices from './usersServices';
import usersHelpers from '../../helpers/usersHelpers';
import friendsHelpers from '../../helpers/friedsHelpers';
import authDAL from '../auth/authDAL';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class AccessUsersData {
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
    if ((!authDAL.checkIfEmailExists(req.body.userEmail)) && req.body.userEmail !== req.decoded.userEmail) return res.json({ Error: 'Email Already Exists' });
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
        const usersResultArr = usersHelpers.createUsersResultArray(foundUsers);
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
        const friendsIds = friendsHelpers.getFriendsID(friends, userID);
        usersHelpers.finalSearchUsersResult(usersResultArr, friendsIds);
        return res.json(usersResultArr);
      }
      res.json({
        Error: 'No Match Found!!!'
      });
    } catch (error) {
      next(error);
    }
  }

  async getRequestedUserProfile (req, res, next) {
    const { id } = req.params;
    const { userID } = req.decoded;
    const values = [ id, userID ];
    try {
      const friend = await Friends.findOne({
        where: {
          [Op.and]: [
            {
              friendOne: {
                [Op.in]: values
              }
            },
            {
              friendTwo: {
                [Op.in]: values
              }
            }
          ]
        }
      });
      const user = await Users.findOne({ where: { id: id } });
      if (friend || (id == userID)) {
        return usersServices.createProfilePageForFriend(user, res);
      } else {
        return usersServices.createProfilePageForUser(user, res);
      }
    } catch (error) {
      console.log('inside get requested user profile error', error);
      next(error);
    }
  }

  async checkIfUserIsLoggedIn (userID) {
    const user = await LoggedInUsers.findOne({
      where: {
        user: (userID - 0)
      }
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}

export default new AccessUsersData();
