import Posts from '../../../database/models/Posts';
import Friends from '../../../database/models/Friends';
import Sequelize from 'sequelize';
import { getFriendsID, attachCommentsToPosts, attachlikeDislikeOnPosts } from '../../../helpers';
const Op = Sequelize.Op;
class AccessPostsData {
  async createNewPost (req, res, next) {
    const { post, profileImage } = req.body;
    try {
      const newPost = {
        postText: post,
        user: req.decoded.userID,
        firstName: req.decoded.firstName,
        lastName: req.decoded.lastName,
        profileImage
      };
      const postResult = await Posts.create(newPost);
      res.json(postResult);
    } catch (error) {
      next(error);
    }
  }

  async getFriendsPosts (req, res, next) {
    const { userID } = req.decoded;
    let friends = null;
    try {
      friends = await Friends.findAll({
        where: {
          [Op.or]: [
            {
              friendOne: userID
            },
            {
              friendTwo: userID
            }
          ]
        }
      });
    } catch (error) {
      console.log('inside get friends posts get all friends error', error);
      next(error);
    }
    const users = (getFriendsID(friends, userID));
    try {
      const allPosts = await Posts.findAll({
        where: {
          user: {
            [Op.in]: users
          }
        }
      });
      if (allPosts.length) {
        const postsWithComments = await attachCommentsToPosts(allPosts);
        const postsWithCommentsLikeDislike = await attachlikeDislikeOnPosts(postsWithComments, userID);
        return res.json(postsWithCommentsLikeDislike);
      }
      return res.json([]);
    } catch (error) {
      console.log('inside get friends posts get all posts error', error);
      next(error);
    }
  }
}

export default new AccessPostsData();
