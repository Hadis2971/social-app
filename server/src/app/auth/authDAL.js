import Users from '../../database/models/Users';
import LoggedInUsers from '../../database/models/LoggedInUsers';

class AuthDal {
  async checkIfEmailExists (email) {
    try {
      const user = await Users.findOne({ where: { email: email } });
      if (user) return true;
      return false;
    } catch (error) {
      console.log('inside checkIfEmailExists error', error);
    }
  }

  async destroyUserSession (req, res, next) {
    const { userID } = req.body;
    try {
      const destroySuccess = await LoggedInUsers.destroy({
        where: {
          user: userID
        }
      });
      if (destroySuccess) {
        res.json({ Success: true });
      }
    } catch (error) {
      console.log('inside destroy user session error', error);
      next(error);
    }
  }
}

export default new AuthDal();
