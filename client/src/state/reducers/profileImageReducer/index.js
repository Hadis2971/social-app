import * as types from '../../actions/profileImageActions/actionTypes';
import initialState from './initialState';
import { updateStateObject } from '../../../helpers';

const profileImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.START_FATCHING_PICTURE): {
      return updateStateObject(state, {
        ...state,
        isFetchingPicture: true
      });
    }
    case (types.FETCHING_PICTURE_SUCCESS): {
      return updateStateObject(state, {
        isFetchingPicture: false,
        profilePirctureURL: action.profilePirctureURL,
        fetchingSuccess: true,
        fetchingFail: false,
        errors: null
      });
    }
    case (types.FETCHING_PICTURE_FAIL): {
      return updateStateObject(state, {
        isFetchingPicture: false,
        profilePirctureURL: '',
        fetchingSuccess: false,
        fetchingFail: true,
        errors: action.errors
      });
    }
    default: return state;
  }
};

export default profileImageReducer;
