import Sequelize from 'sequelize';
import PostComments from '../../../database/models/PostComments';
import UsersPostsLikes from '../../../database/models/UsersPostsLikes';
const Op = Sequelize.Op;
class PostsServices {
  _createPostsResultArray (posts) {
    let helpArr = [];
    for (let post of posts) {
      let helpObj = {
        id: post.id,
        user: post.user,
        postText: post.postText,
        profileImage: post.profileImage,
        firstName: post.firstName,
        lastName: post.lastName,
        likes: post.likes,
        dislikes: post.dislikes
      };
      helpArr.push(helpObj);
    }
    return helpArr;
  }

  async attachCommentsToPosts (posts) {
    let postsWithComments = [];
    let postsArr = this._createPostsResultArray(posts);
    for (let userPost of postsArr) {
      let comments = await PostComments.findAll({
        where: {
          post: userPost.id
        },
        limit: 5
      });
      if (comments.length) userPost.comments = comments;
      postsWithComments.push(userPost);
    }
    return postsWithComments;
  }

  async attachlikeDislikeOnPosts (postsWithComments, userID) {
    let postsWithLikeDislike = [];
    for (let post of postsWithComments) {
      let likeDislike = await UsersPostsLikes.findOne({
        where: {
          [Op.and]: [
            {
              post: post.id
            },
            {
              user: userID
            }
          ]
        }
      });
      if (likeDislike) {
        if (likeDislike.liked) post.liked = true;
        else if (likeDislike.disliked) post.disliked = true;
      }
      postsWithLikeDislike.push(post);
    }
    return postsWithLikeDislike;
  }
}

export default new PostsServices();
