import Network from '../network/network';

class AuthApis {
  constructor () {
    this.baseUrl = '/auth';
  }
  async registerUser (user) {
    try {
      const registerResult = await Network.post(`${this.baseUrl}/register`, null, null, user);
      return registerResult;
    } catch (error) {
      console.log('inside auth apis register user error', error);
    }
  }

  async loginUser (user) {
    try {
      const loginResult = await Network.post(`${this.baseUrl}/login`, null, null, user);
      return loginResult;
    } catch (error) {
      console.log('inside auth apis login user error', error);
    }
  }

  async forgotUserPassword (userEmail) {
    try {
      const resetPasswordResult = await Network.post(`${this.baseUrl}/forgotPassword`, null, null, userEmail);
      return resetPasswordResult;
    } catch (error) {
      console.log('inside reset user password error', error);
    }
  }
}

const authApis = new AuthApis();
export default authApis;
