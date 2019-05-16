import Users from '../../database/models/Users';
import Friends from '../../database/models/Friends';
import { createUsersResultArray, getFriendsID, finalSearchUsersResult } from '../../helpers';
import { checkIfEmailExists } from '../auth/checkUsers';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class AccessUsersData {
  async getProfilePictureUrl (req, res, next) {
    console.log('inside get profile pic url req.decoded', req.decoded);
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
}

export default new AccessUsersData();
