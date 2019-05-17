class FriendsHelpers {
  extractRequestingUserIds (users) {
    return users.map(user => user.requestingUser);
  }

  getFriendsID (friends, userID) {
    const frindsOne = friends.map(friend => friend.get({ plain: true }).friendOne);
    const friendsTwo = friends.map(friend => friend.get({ plain: true }).friendTwo);
    let resultArr = frindsOne.concat(friendsTwo);
    return resultArr.filter(el => el !== userID);
  }
}

export default new FriendsHelpers();
