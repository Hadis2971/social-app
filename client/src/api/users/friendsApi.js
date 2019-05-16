import Network from '../network/network';
import instanceModifiers from '../instanceModifeirs';
import { removeElement } from '../../helpers';
class FriendsApi {
  constructor () {
    this.baseUrl = '/users';
  }

  async addNewFriend (users, element) {
    try {
      instanceModifiers.tokenDecorator(this);
      const addNewFriendResult = await Network.post(`${this.baseUrl}/friends/addFriend`, this.token, this.refreshtoken, users);
      if (addNewFriendResult.data.Success) removeElement(element);
      return addNewFriendResult;
    } catch (error) {
      console.log('isnide add new friend error', error);
    }
  }

  async getAllFriendRequests () {
    try {
      instanceModifiers.tokenDecorator(this);
      const searchResult = await Network.get(`${this.baseUrl}/friends`, this.token, this.refreshtoken);
      return searchResult;
    } catch (error) {
      console.log('inside search for all users error', error);
    }
  }

  async acceptFriendRequest (id, element) {
    const body = {
      requestingUser: id,
      confirm: true
    };
    try {
      instanceModifiers.tokenDecorator(this);
      const confirmFriendRequestResult = await Network.post(`${this.baseUrl}/friends/confirmFriendRequest`, this.token, this.refreshtoken, body);
      if (confirmFriendRequestResult) removeElement(element);
      return confirmFriendRequestResult;
    } catch (error) {
      console.log('inside accept friend request error', error);
    }
  }

  async declineFriendRequest (id, element) {
    const body = {
      requestingUser: id,
      confirm: false
    };
    try {
      instanceModifiers.tokenDecorator(this);
      const confirmFriendRequestResult = await Network.post(`${this.baseUrl}/friends/confirmFriendRequest`, this.token, this.refreshtoken, body);
      if (confirmFriendRequestResult) removeElement(element);
      return confirmFriendRequestResult;
    } catch (error) {
      console.log('inside decline friend request error', error);
    }
  }
}

export default new FriendsApi();
