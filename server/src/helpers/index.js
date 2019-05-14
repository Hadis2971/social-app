import jwt from 'jsonwebtoken';
import isEmpty from 'is-empty';
import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';
import PostComments from '../database/models/PostComments';
import UsersPostsLikes from '../database/models/UsersPostsLikes';
import { secretOrKey, secretForResetPassword } from '../config';
const Op = Sequelize.Op;

export const handleEmptyInput = (input) => {
  for (let key in input) {
    if (isEmpty(input[key])) input[key] = '';
  }
};

export const hashUserPassword = async (password, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    next(error);
  }
};

export const checkUserPassword = async (password, hash) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hash);
    return passwordMatch;
  } catch (error) {
    console.log('inside check password error', error);
  }
};

export const createUsersResultArray = (users) => {
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
};

export const extractRequestingUserIds = (users) => {
  return users.map(user => user.requestingUser);
};

export const extractUserIds = (users) => {
  return users.map(user => user.id);
};

export const getFriendsID = (friends, userID) => {
  const frindsOne = friends.map(friend => friend.get({ plain: true }).friendOne);
  const friendsTwo = friends.map(friend => friend.get({ plain: true }).friendTwo);
  let resultArr = frindsOne.concat(friendsTwo);
  return resultArr.filter(el => el !== userID);
};

export const finalSearchUsersResult = (users, friends) => {
  for (let user of users) {
    if (friends.includes(user.id)) {
      user.friend = true;
    }
  }
};

export const createPostsResultArray = (posts) => {
  let helpArr = [];
  for (let post of posts) {
    let helpObj = {
      id: post.id,
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
};

export const attachCommentsToPosts = async (posts) => {
  let postsWithComments = [];
  let postsArr = createPostsResultArray(posts);
  for (let userPost of postsArr) {
    let comments = await PostComments.findAll({
      where: {
        post: userPost.id
      }
    });
    if (comments.length) userPost.comments = comments;
    postsWithComments.push(userPost);
  }
  return postsWithComments;
};

export const attachlikeDislikeOnPosts = async (postsWithComments, userID) => {
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
};

export const createTokenForPasswordReset = async (user) => {
  const payload = {
    userID: user.id,
    userEmail: user.email
  };
  const token = await jwt.sign(payload, secretForResetPassword, { expiresIn: 300 });
  return token;
};
