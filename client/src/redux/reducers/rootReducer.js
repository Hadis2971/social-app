import registerReducer from './authReducers/registerReducer';
import loginReducer from './authReducers/loginReducer';
import profileImageReducer from './profileImageReducer';
import updateUserReducer from './usersReducers/updateAccount';
import friendsReducer from './friendsReducers';
import usersAccoutsReducer from './usersReducers/usersProfilePage';
import TwitterPostsReducer from './twitterReducers/twitterPostsReducer';
import forgotPasswordReducer from './authReducers/forgotPassword';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  profileImage: profileImageReducer,
  updateUser: updateUserReducer,
  friendsReducer,
  usersAccoutsReducer,
  twitterPosts: TwitterPostsReducer,
  forgotPasswordReducer: forgotPasswordReducer
});

export default rootReducer;
