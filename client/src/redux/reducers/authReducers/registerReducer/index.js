import initialState from './initialState';
import * as types from '../../../actions/authActions/registerActions/actionTypes';
import { updateStateObject } from '../../../../helpers';

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.REGISTER_START):
      return updateStateObject(state, {
        ...state,
        registerStart: true,
        registerSuccess: false
      });
    case (types.REGISTER_SUCCESS):
      return updateStateObject(state, {
        ...state,
        registerStart: false,
        registerSuccess: true
      });
    case (types.REGISTER_FAIL):
      return updateStateObject(state, {
        ...state,
        registerStart: false,
        errors: action.errors,
        registerSuccess: false
      });

    default: return state;
  }
};

export default registerReducer;
