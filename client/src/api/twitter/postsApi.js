import Network from '../network/network';

class PostsApi {
  constructor () {
    this.baseUrl = '/twitter/posts';
  }

  async postNewPost (newPost) {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const postNewPostResult = await Network.post(this.baseUrl, token, refreshtoken, newPost);
      console.log('inside new post api result', postNewPostResult);
      return postNewPostResult;
    } catch (error) {
      console.log('inside post new post error', error);
    }
  }

  async getPosts () {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const getPostsResult = await Network.get(this.baseUrl, token, refreshtoken);
      return getPostsResult;
    } catch (error) {
      console.log('inside get posts error', error);
    }
  }

  async likePost (like, id) {
    const body = { like, id };
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const likePostResult = Network.post(`${this.baseUrl}/likes`, token, refreshtoken, body);
      return likePostResult;
    } catch (error) {
      console.log('inside like post error', error);
    }
  }

  async dislikePost (like, id) {
    const body = { like, id };
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const dislikePostResult = Network.post(`${this.baseUrl}/dislikes`, token, refreshtoken, body);
      return dislikePostResult;
    } catch (error) {
      console.log('inside like post error', error);
    }
  }

  async createCommentForPost (post, comment) {
    const body = { post, comment };
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    try {
      const createCommentResult = await Network.post(`${this.baseUrl}/comments`, token, refreshtoken, body);
      return createCommentResult;
    } catch (error) {
      console.log('inside create comment for post error', error);
    }
  }
}

const postsApi = new PostsApi();
export default postsApi;
