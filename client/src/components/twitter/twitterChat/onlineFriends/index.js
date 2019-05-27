import React, { Component } from 'react';
import ChatBox from '../chatBox';
import OnlineUser from '../onlineUser';
import './onlineFriends.css';

class OnlineFriends extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      openChatBox: false,
      listOfOnlineFriends: []
    };
  }

  openCloseChatBox = () => {
    this.setState((prevState) => ({
      openChatBox: (!prevState.openChatBox)
    }));
  }

  openCloseOnlineFriendsBox = () => {
      this.setState((prevState) => ({
        open: (!prevState.open)
      }));
  };

  componentWillReceiveProps (nextProps) {
    if (this.state.listOfOnlineFriends.length !== nextProps.onlineFriends.length) {
      this.createListOfOnlineFriends(nextProps.onlineFriends);
    }
  };

  createListOfOnlineFriends = (onlineFriends) => {
    const { listOfOnlineFriends } = this.state;
    let helpArr = [...onlineFriends];
    helpArr = helpArr.concat(listOfOnlineFriends);
    const helpSet = new Set(helpArr);
    this.setState({
      listOfOnlineFriends: [...helpSet].map(friend => 
        <OnlineUser 
          openCloseChatBox={this.openCloseChatBox}
          key={friend.id}
          profileImage={friend.profileImage}
          username={friend.username}
        />)
    });
  };

  render () {
    const { open, openChatBox } = this.state;
    const { listOfOnlineFriends } = this.state;
    return (
    <div>
      {openChatBox && <ChatBox openCloseChatBox={this.openCloseChatBox}/>}
      <div 
        onClick={this.openCloseOnlineFriendsBox} 
        className={ open ? 'online-friends-box online-friends-box-opened' : 'online-friends-box online-friends-box-closed'}
    >
        <h3 className={open? 'open-close-hdr-white text-center' : 'open-close-hdr-blue text-center'}>
        {open ? 'Click To Close List Of Online Friends' : 'Click To Open List Of Online Friends'}</h3>
        {open && listOfOnlineFriends}
      </div>
    </div>
   
    );
  }
}

export default OnlineFriends;
