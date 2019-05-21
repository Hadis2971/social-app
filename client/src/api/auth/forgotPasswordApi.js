import Network from '../network/network';

class ForgotPasswordApi {
  constructor () {
    this.baseUrl = '/forgotPassword';
  }
  async forgotUserPassword (userEmail) {
    try {
      const resetPasswordResult = await Network.post(`${this.baseUrl}`, null, null, userEmail);
      return resetPasswordResult;
    } catch (error) {
      console.log('inside reset user password error', error);
    }
  }
}

export default new ForgotPasswordApi();
