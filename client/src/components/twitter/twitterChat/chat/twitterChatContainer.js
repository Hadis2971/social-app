import { connect } from 'react-redux';
import TwitterChatComponent from './twitterChatComponent';
import { getOnlineFriends } from '../../../../state/actions/firendsActions/actionCreators';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    userID: state.authReducer.login.userID,
    onlineFriends: state.friendsReducer.onlineFriends
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getOnlineFriends
      },
      dispatch
    )
  };
};

const TwitterChatContainer = connect(mapStateToProps, mapDispatchToProps)(TwitterChatComponent);

export default TwitterChatContainer;
