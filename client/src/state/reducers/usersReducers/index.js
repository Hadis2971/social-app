import { combineReducers } from 'redux';
import updateUserReducer from './updateAccount';
import usersProfilePageReducer from './profilePage';

const usersReducer = combineReducers({
  updateAccount: updateUserReducer,
  usersProfilePage: usersProfilePageReducer
});

export default usersReducer;
