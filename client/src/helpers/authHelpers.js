import jwtDecode from 'jwt-decode';
import axios from 'axios';

class AuthHelpers {
  async decodeAuthToken (token) {
    try {
      const decodedInfo = await jwtDecode(token);
      return decodedInfo;
    } catch (error) {
      console.log('inside decode auth token error', error);
    }
  }

  handelTokenRefresh (newToken, response) {
    localStorage.setItem('token', newToken);
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': token,
      'refreshtoken': response.config.headers.refreshtoken
    };
    return axios({
      url: response.config.url,
      method: response.config.method,
      data: response.config.data,
      baseURL: response.config.baseURL,
      headers: headers
    });
  }
}

export default new AuthHelpers();
