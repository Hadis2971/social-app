import React, { Component } from 'react';
import ChatBox from '../chatBox';
import OnlineFriends from '../onlineFriends';

class TwitterChatComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      onlineUsersToPassOn: []
    };
  }

  async componentDidMount () {
    const { getOnlineFriends } = this.props.actions;
    const { userID } = this.props;
    await getOnlineFriends(userID);
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.onlineUsersToPassOn.length !== nextProps.onlineFriends.length) {
      this.setState({
        onlineUsersToPassOn: [...nextProps.onlineFriends]
      });
    }
  }

  render () {
    const { onlineUsersToPassOn } = this.state;
    console.log('inside twitter chat component online friends arr', onlineUsersToPassOn);
    return (
      <div className='col-lg-5'>
        <OnlineFriends onlineFriends={onlineUsersToPassOn} />
      </div>
    );
  }
}

export default TwitterChatComponent;
