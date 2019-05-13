import registerReducer from './authReducers/registerReducer';
import loginReducer from './authReducers/loginReducer';
import profileImageReducer from './profileImageReducer';
import updateUserReducer from './updateUserReducers';
import friendsReducer from './friendsReducers';
import TwitterPostsReducer from './twitterReducers/twitterPostsReducer';
import forgotPasswordReducer from './authReducers/forgotPassword';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  profileImage: profileImageReducer,
  updateUser: updateUserReducer,
  friendsReducer,
  twitterPosts: TwitterPostsReducer,
  forgotPasswordReducer: forgotPasswordReducer
});

export default rootReducer;
