import axios from 'axios';
import { baseUrlForApis } from '../../config';
import { handelTokenRefresh } from '../../helpers';
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use((response) => {
  if (response.data.newToken) {
    return handelTokenRefresh(response.data.newToken, response);
  }
  return response;
});

class Network {
  _defaultHeaders (token, refreshtoken) {
    return {
      'Authorization': token,
      'refreshtoken': refreshtoken
    };
  }
  async post (path, token, refreshtoken, body, headers) {
    return this._request({
      url: path,
      method: 'post',
      data: body,
      baseURL: baseUrlForApis,
      headers: Object.assign({}, this._defaultHeaders(token, refreshtoken), headers)
    });
  }

  async get (path, token, refreshtoken, headers) {
    return this._request({
      url: path,
      method: 'get',
      baseURL: baseUrlForApis,
      headers: Object.assign({}, this._defaultHeaders(token, refreshtoken), headers)
    });
  }

  async put (path, token, refreshtoken, body, headers) {
    return this._request({
      url: path,
      method: 'put',
      data: body,
      baseURL: baseUrlForApis,
      headers: Object.assign({}, this._defaultHeaders(token, refreshtoken), headers)
    });
  }

  async delete (path, token, refreshtoken, body, headers) {
    return this._request({
      url: path,
      method: 'delete',
      data: body,
      baseURL: baseUrlForApis,
      headers: Object.assign({}, this._defaultHeaders(token, refreshtoken), headers)
    });
  }

  _request (config) {
    return axiosInstance(config);
  }
}

export default new Network();
