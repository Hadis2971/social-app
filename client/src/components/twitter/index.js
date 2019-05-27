import React from 'react';
import TwitterPosts from './twitter_posts/twitterPostsContainer';
import TwitterChatContainer from './twitterChat/chat/twitterChatContainer';
const TwitterPostsAndChat = (props) => {
  return (
    <div className='row'>
      <TwitterPosts />
      <TwitterChatContainer />
    </div>
  );
};

export default TwitterPostsAndChat;
