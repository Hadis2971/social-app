import LikeDislike from './likeDislike';
import Posts from '../../../../database/models/Posts';
import UsersPostsLikes from '../../../../database/models/UsersPostsLikes';
import Notifications from '../../../../database/models/Notifications';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class AccessLikesData extends LikeDislike {
  constructor () {
    super();
    this.likePost = this.likePost.bind(this);
  }

  async likePost (req, res, next) {
    const { id } = req.body;
    const postID = id;
    const { userID } = req.decoded;
    const liked = await this.likedPost(postID, userID, next);
    const disliked = await this.dislikedPost(postID, userID, next);

    if (liked) {
      try {
        await Posts.update(
          { likes: Sequelize.literal('likes -1') },
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
        like: -1,
        dislike: 0
      });
    } else if (disliked) {
      try {
        await Posts.update(
          { likes: Sequelize.literal('likes +1'), dislikes: Sequelize.literal('dislikes -1') },
          { where: { id: postID } });
      } catch (error) {
        next(error);
      }

      try {
        await UsersPostsLikes.update(
          { liked: true, disliked: false },
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
        like: 1,
        dislike: -1
      });
    } else {
      try {
        await Posts.update(
          { likes: Sequelize.literal('likes +1') },
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
          { liked: true, disliked: false },
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
        await UsersPostsLikes.create({ user: userID, post: postID, liked: true, disliked: false });
      }
      return res.json({
        like: 1,
        dislike: 0
      });
    }
  }
}

export default new AccessLikesData();
