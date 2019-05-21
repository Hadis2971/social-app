import Posts from '../../../database/models/Posts';
import Friends from '../../../database/models/Friends';
import friendsHelpers from '../../../helpers/friedsHelpers';
import postsServices from './postsServices';
import Sequelize from 'sequelize';
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
    const offset = (req.params.offset) ? parseInt(req.params.offset) : 0;
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
    const users = (friendsHelpers.getFriendsID(friends, userID));
    try {
      const allPosts = await Posts.findAll({
        where: {
          user: {
            [Op.in]: users
          }
        },
        limit: 5,
        offset: offset
      });
      if (allPosts.length) {
        const postsWithComments = await postsServices.attachCommentsToPosts(allPosts);
        const postsWithCommentsLikeDislike = await postsServices.attachlikeDislikeOnPosts(postsWithComments, userID);
        return res.json(postsWithCommentsLikeDislike);
      }
      return res.json([]);
    } catch (error) {
      console.log('inside get friends posts get all posts error', error);
      next(error);
    }
  }

  async loadMorePostsForRequestedProfile (req, res, next) {
    const { user, offset } = req.params;
    try {
      const result = await Posts.findAll({
        where: {
          user: user
        },
        limit: 5,
        offset: parseInt(offset),
        duplicating: false
      });
      res.json(result);
    } catch (error) {
      console.log('load more posts error', error);
      next(error);
    }
  }
}

export default new AccessPostsData();
