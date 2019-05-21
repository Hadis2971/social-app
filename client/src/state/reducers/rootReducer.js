import authReducer from './authReducers';
import usersReducer from './usersReducers';
import profileImageReducer from './profileImageReducer';
import friendsReducer from './friendsReducers';
import TwitterPostsReducer from './twitterReducers/twitterPostsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authReducer,
  usersReducer,
  profileImage: profileImageReducer,
  friendsReducer,
  twitterPosts: TwitterPostsReducer
});

export default rootReducer;
