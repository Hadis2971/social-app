import Posts from '../../database/models/Posts';

class UsersServices {
  async createProfilePageForFriend (userInfo, res) {
    const posts = await Posts.findAll({ where: { user: userInfo.id }, limit: 5 });
    const user = {
      profileImage: userInfo.profileImage,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userInfo.username
    };
    res.json({ user, posts });
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

export default new UsersServices();
