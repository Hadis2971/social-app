import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendActionsCreators from '../../../state/actions/firendsActions/actionCreators';
import SearchForUserComponent from './searchForUserComponent';

const mapStateToProps = (state) => {
  return {
    foundUsers: state.friendsReducer.foundUsers,
    searchForFriendStart: state.friendsReducer.searchForFriendStart,
    searchForFriendsError: state.friendsReducer.searchForFriendsError,
    userID: state.authReducer.login.userID
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        ...friendActionsCreators
      },
      dispatch
    )
  };
};

const SearchForUserConatiner = connect(mapStateToProps, mapDispatchToProps)(SearchForUserComponent);

export default SearchForUserConatiner;
