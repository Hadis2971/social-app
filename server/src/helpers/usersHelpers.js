class UsersHelpers {
  createUsersResultArray (users) {
    let helpArr = [];
    for (let user of users) {
      let helpObj = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage
      };
      helpArr.push(helpObj);
    }
    return helpArr;
  }

  extractUserIds (users) {
    return users.map(user => user.id);
  }

  finalSearchUsersResult (users, friends) {
    for (let user of users) {
      if (friends.includes(user.id)) {
        user.friend = true;
      }
    }
  }
}

export default new UsersHelpers();
