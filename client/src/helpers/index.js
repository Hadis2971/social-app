import jwtDecode from 'jwt-decode';
import axios from 'axios';
export const decodeAuthToken = async (token) => {
  try {
    const decodedInfo = await jwtDecode(token);
    return decodedInfo;
  } catch (error) {
    console.log('inside decode auth token error', error);
  }
};

export const saveUserInfoInLocalStorage = (userInfo) => {
  for (let key in userInfo) {
    localStorage.setItem(key, userInfo[key]);
  }
};

export const removeUserInfoFromLocalStorage = () => {
  for (let key in localStorage) {
    localStorage.removeItem(key);
  }
};

export const turnObjectIntoArray = (obj) => {
  if (typeof obj === 'string') return obj;
  return Object.keys(obj).map(key => obj[key]);
};

export const updateInfoLocalStorage = (newInfo) => {
  for (let key in newInfo) {
    if (newInfo[key] && key !== 'message') localStorage.setItem(key, newInfo[key]);
  }
};

export const createUpdateObject = (newInfo, file) => {
  let updateObject = {};
  for (let key in newInfo) {
    if (newInfo[key]) updateObject[key] = newInfo[key];
  }
  if (file) updateObject['userProfilePicture'] = file;
  return updateObject;
};

export const createFormData = (updateObject) => {
  let newFormData = new FormData();
  for (let key in updateObject) {
    newFormData.append(key, updateObject[key]);
  }
  return newFormData;
};

export const removeElement = (element) => {
  element.style.display = 'none';
};

export const updateStateObject = (oldState, newState) => {
  return Object.assign({}, oldState, newState);
};

export const updateLikesDislikes = (like, dislike, values) => {
  let likeNum = parseInt(like.textContent);
  let dislikeNum = parseInt(dislike.textContent);

  likeNum += (values.like - 0);
  dislikeNum += (values.dislike - 0);

  likeNum = (likeNum < 0) ? 0 : likeNum;
  dislikeNum = (dislikeNum < 0) ? 0 : dislikeNum;

  like.textContent = likeNum;
  dislike.textContent = dislikeNum;
};

export const getAxiosRequest = (axiosInstance) => {
  axiosInstance.interceptors.request.use((request) => {
    console.log('inside axios interceptor request', request);
    return request;
  }, (error) => {
    return Promise.reject(error);
  });
};

export const handelTokenRefresh = (newToken, response) => {
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
};
