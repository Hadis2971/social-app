import Network from '../network/network';
import instanceModifiers from '../instanceModifeirs';
class UsersApi {
  constructor () {
    this.baseUrl = '/users';
  }

  async getProfileImage () {
    try {
      instanceModifiers.tokenDecorator(this);
      const profileImageUrl = await Network.get(`${this.baseUrl}/profile`, this.token, this.refreshtoken);
      return profileImageUrl;
    } catch (error) {
      console.log('inside get profile image error', error);
    }
  }

  async updateUserInfo (newInfo) {
    try {
      instanceModifiers.tokenDecorator(this);
      const updateResutl = await Network.put(`${this.baseUrl}/profile`, this.token, this.refreshtoken, newInfo, { 'Content-Type': 'multipart/form-data' });
      return updateResutl;
    } catch (error) {
      console.log('inside get update profile error', error);
    }
  }

  async getAllSearchedUsers (value) {
    const body = { searchTerm: value };
    try {
      instanceModifiers.tokenDecorator(this);
      const searchResult = await Network.post(`${this.baseUrl}/`, this.token, this.refreshtoken, body);
      return searchResult;
    } catch (error) {
      console.log('inside search for friends error', error);
    }
  }
}

export default new UsersApi();
