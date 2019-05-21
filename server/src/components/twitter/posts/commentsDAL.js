import PostComments from '../../../database/models/PostComments';

class AccessCommentsData {
  async createComment (req, res, next) {
    const { userID, profileImage, firstName, lastName } = req.decoded;
    const { comment, post } = req.body;
    const newComment = {
      comment,
      profileImage,
      user: userID,
      post,
      firstName,
      lastName
    };
    try {
      const result = await PostComments.create(newComment);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async loadMoreCommentsForPost (req, res, next) {
    const { post, offset } = req.params;
    try {
      const postCommentsResult = await PostComments.findAll({
        where: {
          post: post
        },
        offset: parseInt(offset),
        limit: 5
      });
      res.json(postCommentsResult);
    } catch (error) {
      next(error);
    }
  }
}

export default new AccessCommentsData();
