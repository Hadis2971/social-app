import LikeDislike from './likeDislike';
import Posts from '../../../../database/models/Posts';
import UsersPostsLikes from '../../../../database/models/UsersPostsLikes';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class AccessDislikesData extends LikeDislike {
  constructor () {
    super();
    this.dislikePost = this.dislikePost.bind(this);
  }

  async dislikePost (req, res, next) {
    const { id } = req.body;
    const postID = id;
    const { userID } = req.decoded;
    const liked = await this.likedPost(postID, userID, next);
    const disliked = await this.dislikedPost(postID, userID, next);

    if (disliked) {
      try {
        await Posts.update(
          { dislikes: Sequelize.literal('dislikes -1') },
          { where: { id: postID } });
      } catch (error) {
        next(error);
      }

      try {
        await UsersPostsLikes.update(
          { liked: false, disliked: false },
          {
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
          }
        );
      } catch (error) {
        next(error);
      }
      return res.json({
        like: 0,
        dislike: -1
      });
    } else if (liked) {
      try {
        await Posts.update(
          { likes: Sequelize.literal('likes -1'), dislikes: Sequelize.literal('dislikes +1') },
          { where: { id: postID } });
      } catch (error) {
        next(error);
      }

      try {
        await UsersPostsLikes.update(
          { liked: false, disliked: true },
          {
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
          }
        );
      } catch (error) {
        next(error);
      }
      return res.json({
        like: -1,
        dislike: 1
      });
    } else {
      try {
        await Posts.update(
          { dislikes: Sequelize.literal('dislikes +1') },
          { where: { id: postID } });
      } catch (error) {
        next(error);
      }

      const post = await UsersPostsLikes.findOne(
        {
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
        }
      );
      if (post) {
        await UsersPostsLikes.update(
          { liked: false, disliked: true },
          {
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
          }
        );
      } else {
        await UsersPostsLikes.create({ user: userID, post: postID, liked: false, disliked: true });
      }
      return res.json({
        like: 0,
        dislike: 1
      });
    }
  }
}

export default new AccessDislikesData();
