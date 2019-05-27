import notifications from '../sockets/notifications';

class PostsHelpers {
  updateLikesDislikes (like, dislike, values, userToNotify, currentUser) {
    let likeNum = parseInt(like.textContent);
    let dislikeNum = parseInt(dislike.textContent);

    likeNum += (values.like - 0);
    dislikeNum += (values.dislike - 0);

    likeNum = (likeNum < 0) ? 0 : likeNum;
    dislikeNum = (dislikeNum < 0) ? 0 : dislikeNum;

    like.textContent = likeNum;
    dislike.textContent = dislikeNum;

    if (values.like > 0) {
      notifications.userLikeNotify(userToNotify, currentUser);
    }

    if (values.dislike > 0) {
      notifications.userDislikeNotify(userToNotify, currentUser);
    }
  }

  doneLoading (postsArr, loadedArr) {
    const lastPost = postsArr[postsArr.length - 1];
    const firstLoadadedPost = loadedArr[0];
    if (lastPost.id === firstLoadadedPost.id) return true;
    else return false;
  }
}

export default new PostsHelpers();
