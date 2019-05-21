let initialState = {
  authenticatingStart: false,
  firstName: '',
  lastName: '',
  userID: null,
  username: null,
  profileImage: '',
  userEmail: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  errors: null
};

if (localStorage.getItem('token')) {
  initialState = {
    authenticatingStart: false,
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    userID: localStorage.getItem('userID'),
    username: localStorage.getItem('username'),
    userEmail: localStorage.getItem('userEmail'),
    profileImage: localStorage.getItem('profileImage'),
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: (!!localStorage.getItem('token')),
    errors: null
  };
}

export default initialState;
