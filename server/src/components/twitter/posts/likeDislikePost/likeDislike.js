import UsersPostsLikes from '../../../../database/models/UsersPostsLikes';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class LikeDislike {
  async likedPost (postID, userID, next) {
    try {
      const post = await UsersPostsLikes.findOne({
        where: {
          [Op.and]: [
            {
              user: userID
            },
            {
              post: postID
            }
          ]
        }
      });
      if (post && post.liked) {
        return true;
      } else return false;
    } catch (error) {
      next(error);
    }
  }

  async dislikedPost (postID, userID, next) {
    try {
      const post = await UsersPostsLikes.findOne({
        where: {
          [Op.and]: [
            {
              user: userID
            },
            {
              post: postID
            }
          ]
        }
      });
      if (post && post.disliked) {
        return true;
      } else return false;
    } catch (error) {
      next(error);
    }
  }
}

export default LikeDislike;
