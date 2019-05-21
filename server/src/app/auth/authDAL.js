import Users from '../../database/models/Users';

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
}

export default new AuthDal();
