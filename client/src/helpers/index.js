export const turnObjectIntoArray = (obj) => {
  if (typeof obj === 'string') return obj;
  return Object.keys(obj).map(key => obj[key]);
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

export const getAxiosRequest = (axiosInstance) => {
  axiosInstance.interceptors.request.use((request) => {
    console.log('inside axios interceptor request', request);
    return request;
  }, (error) => {
    return Promise.reject(error);
  });
};

export const getDataFromLocalStorage = (keys) => {
  let data = {};
  for (let key in keys) {
    data[key] = localStorage.getItem(key);
  }
  return data;
};
