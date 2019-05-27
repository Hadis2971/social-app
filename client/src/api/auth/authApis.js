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

  async logoutUser (user) {
    console.log('lgout api user', user);
    try {
      const logoutUserResult = await Network.post(`${this.baseUrl}/logout`, null, null, { userID: user });
      console.log('lgout api logoutUserResult', logoutUserResult);
      return logoutUserResult;
    } catch (error) {
      console.log('inside auth apis logout user error', error);
    }
  }
}

const authApis = new AuthApis();
export default authApis;
