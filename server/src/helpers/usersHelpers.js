import Posts from '../database/models/Posts';

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

  async createProfilePageForFriend (user, res) {
    const posts = await Posts.findAll({ where: { user: user.id } });
    const result = {
      profileImage: user.profileImage,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      posts
    };
    res.json(result);
  }

  createProfilePageForUser (user, res) {
    const result = {
      profileImage: user.profileImage,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    };
    res.json(result);
  }
}

export default new UsersHelpers();
