import Network from '../network/network';
import { removeElement } from '../../helpers';
class UsersApi {
  constructor () {
    this.baseUrl = '/users';
    // this.token = localStorage.getItem('token');
  }

  async getProfileImage () {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const profileImageUrl = await Network.get(`${this.baseUrl}/profile`, token, refreshtoken);
      return profileImageUrl;
    } catch (error) {
      console.log('inside get profile image error', error);
    }
  }

  async updateUserInfo (newInfo) {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const updateResutl = await Network.put(`${this.baseUrl}/profile`, token, refreshtoken, newInfo, { 'Content-Type': 'multipart/form-data' });
      return updateResutl;
    } catch (error) {
      console.log('inside get update profile error', error);
    }
  }

  async addNewFriend (users, element) {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const addNewFriendResult = await Network.post(`${this.baseUrl}/friends/addFriend`, token, refreshtoken, users);
      if (addNewFriendResult.data.Success) removeElement(element);
      return addNewFriendResult;
    } catch (error) {
      console.log('isnide add new friend error', error);
    }
  }

  async getAllSearchedUsers (value) {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    const body = { searchTerm: value };
    try {
      const searchResult = await Network.post(`${this.baseUrl}/`, token, refreshtoken, body);
      return searchResult;
    } catch (error) {
      console.log('inside search for friends error', error);
    }
  }

  async getAllFriendRequests () {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const searchResult = await Network.get(`${this.baseUrl}/friends`, token, refreshtoken);
      return searchResult;
    } catch (error) {
      console.log('inside search for all users error', error);
    }
  }

  async acceptFriendRequest (id, element) {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    const body = {
      requestingUser: id,
      confirm: true
    };
    try {
      const confirmFriendRequestResult = await Network.post(`${this.baseUrl}/friends/confirmFriendRequest`, token, refreshtoken, body);
      if (confirmFriendRequestResult) removeElement(element);
      return confirmFriendRequestResult;
    } catch (error) {
      console.log('inside accept friend request error', error);
    }
  }

  async declineFriendRequest (id, element) {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    const body = {
      requestingUser: id,
      confirm: false
    };
    try {
      const confirmFriendRequestResult = await Network.post(`${this.baseUrl}/friends/confirmFriendRequest`, token, refreshtoken, body);
      if (confirmFriendRequestResult) removeElement(element);
      return confirmFriendRequestResult;
    } catch (error) {
      console.log('inside decline friend request error', error);
    }
  }
}

const usersApi = new UsersApi();
export default usersApi;
