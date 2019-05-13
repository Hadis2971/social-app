import initialState from './initialState';
import * as types from '../../../actions/authActions/loginActions/actionTypes';
import { updateStateObject } from '../../../../helpers';

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.LOGIN_START):
      state = {
        ...state,
        authenticatingStart: true
      };
      return state;
    case (types.LOGIN_SUCCESS):
      return updateStateObject(state, {
        authenticatingStart: false,
        userID: action.userID,
        username: action.username,
        userEmail: action.userEmail,
        profileImage: action.profileImage,
        firstName: action.firstName,
        lastName: action.lastName,
        token: action.token,
        refreshToken: action.refreshToken,
        isAuthenticated: (!!action.token),
        errors: null
      });
    case (types.LOGIN_FAIL):
      return updateStateObject(state, {
        authenticatingStart: false,
        userID: null,
        username: null,
        firstName: null,
        lastName: null,
        profileImage: '',
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        errors: action.errors
      });
    case (types.LOGOUT_USER):
      return updateStateObject(state, {
        authenticatingStart: false,
        userID: null,
        username: null,
        firstName: null,
        lastName: null,
        profileImage: '',
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        errors: null
      });

    default: return state;
  }
};

export default loginReducer;
