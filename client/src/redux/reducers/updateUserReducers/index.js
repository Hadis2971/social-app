import * as types from '../../actions/updateUserActions/actionTypes';
import inistialState from './initialState';
import { updateStateObject } from '../../../helpers';
const updateUserReducer = (state = inistialState, action) => {
  switch (action.type) {
    case (types.UPDATE_USER_START): {
      return updateStateObject(state, {
        ...state,
        errors: null,
        updateUserInfoStart: true
      });
    }
    case (types.UPDATE_USER_SUCCESS): {
      return updateStateObject(state, {
        ...state,
        errors: null,
        updateUserInfoStart: false,
        updateUserInfoSuccess: true,
        user: action.user
      });
    }
    case (types.UPDATE_USER_FAILE): {
      return updateStateObject(state, {
        ...state,
        errors: action.errors,
        updateUserInfoSuccess: false,
        updateUserInfoStart: false
      });
    }
    default: return state;
  }
};

export default updateUserReducer;
