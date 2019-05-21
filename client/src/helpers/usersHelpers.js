class UsersHelpers {
  saveUserInfoInLocalStorage (userInfo) {
    for (let key in userInfo) {
      localStorage.setItem(key, userInfo[key]);
    }
  }

  removeUserInfoFromLocalStorage () {
    for (let key in localStorage) {
      localStorage.removeItem(key);
    }
  }

  createUpdateUserObject (newInfo, file) {
    let updateObject = {};
    for (let key in newInfo) {
      if (newInfo[key]) updateObject[key] = newInfo[key];
    }
    if (file) updateObject['userProfilePicture'] = file;
    return updateObject;
  }

  updateUserInfoInLocalStorage (newInfo) {
    for (let key in newInfo) {
      if (newInfo[key] && key !== 'message') localStorage.setItem(key, newInfo[key]);
    }
  }
}

export default new UsersHelpers();
