import Network from '../network/network';
import instanceModifiers from '../instanceModifeirs';
class PostsApi {
  constructor () {
    this.baseUrl = '/twitter/posts';
  }

  async postNewPost (newPost) {
    try {
      instanceModifiers.tokenDecorator(this);
      const postNewPostResult = await Network.post(this.baseUrl, this.token, this.refreshtoken, newPost);
      return postNewPostResult;
    } catch (error) {
      console.log('inside post new post error', error);
    }
  }

  async getPosts () {
    try {
      instanceModifiers.tokenDecorator(this);
      const getPostsResult = await Network.get(this.baseUrl, this.token, this.refreshtoken);
      return getPostsResult;
    } catch (error) {
      console.log('inside get posts error', error);
    }
  }

  async likePost (like, id) {
    const body = { like, id };
    try {
      instanceModifiers.tokenDecorator(this);
      const likePostResult = Network.post(`${this.baseUrl}/likes`, this.token, this.refreshtoken, body);
      return likePostResult;
    } catch (error) {
      console.log('inside like post error', error);
    }
  }

  async dislikePost (like, id) {
    const body = { like, id };
    try {
      instanceModifiers.tokenDecorator(this);
      const dislikePostResult = Network.post(`${this.baseUrl}/dislikes`, this.token, this.refreshtoken, body);
      return dislikePostResult;
    } catch (error) {
      console.log('inside like post error', error);
    }
  }

  async loadMorePostsForRequestedProfile (user, offset) {
    try {
      instanceModifiers.tokenDecorator(this);
      const loadMorePostsRequestedProfileResult = await Network.get(`${this.baseUrl}/requestedProfile/${user}/${offset}`, this.token, this.refreshtoken);
      return loadMorePostsRequestedProfileResult;
    } catch (error) {
      console.log('inside load more posts requested profile error', error);
    }
  }

  async loadMorePosts (user, offset) {
    try {
      instanceModifiers.tokenDecorator(this);
      const loadMorePostsResult = await Network.get(`${this.baseUrl}/${user}/${offset}`, this.token, this.refreshtoken);
      return loadMorePostsResult;
    } catch (error) {
      console.log('inside load more profile error', error);
    }
  }

  async createCommentForPost (post, comment) {
    const body = { post, comment };
    try {
      instanceModifiers.tokenDecorator(this);
      const createCommentResult = await Network.post(`${this.baseUrl}/comments`, this.token, this.refreshtoken, body);
      return createCommentResult;
    } catch (error) {
      console.log('inside create comment for post error', error);
    }
  }

  async loadMoreCommentsForPost (post, offset) {
    try {
      instanceModifiers.tokenDecorator(this);
      const loadMoreCommentsForPostResult = await Network.get(`${this.baseUrl}/comments/${post}/${offset}`, this.token, this.refreshtoken);
      return loadMoreCommentsForPostResult;
    } catch (error) {
      console.log('inside load more comments error', error);
    }
  }
}

export default new PostsApi();
