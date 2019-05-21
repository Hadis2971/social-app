import React, { PureComponent } from 'react';
import RequestedProfilePost from './post';
import LoadMorePosts from '../../../common/loadMorePosts';
import SmallSpinner from '../../../standardLayout/smallSpinner';
import Errors from '../../../common/errors';
import './profilePosts.css';

class RequestedProfilePosts extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      offset: 5,
      errors: null,
      postsList: []
    };
  }

  

  componentDidMount () {
    const { posts } = this.props;
    if (posts.length > 0) {
      this.setPosts(posts);
    }
  };

  componentWillReceiveProps (nextProps) {
    const { postsList } = this.state;
    if (nextProps.posts.length !== postsList.length) {
      this.setPosts(nextProps.posts);
    }
  };

  setPosts = (posts) => {
    const { likePost, dislikePost } = this.props;
    this.setState({
      postsList: posts.map(post => {
        return <RequestedProfilePost
          key={post.id}
          id={post.id}
          postText={post.postText}
          likes={post.likes}
          dislikes={post.dislikes}
          likePost={likePost}
          dislikePost={dislikePost}
        />;
      })
    });
  };

  loadMorePostsForRequestedProfileWithOffset = async () => {
    const { loadMorePostsForRequestedProfile, user } = this.props;
    const { offset } = this.state;
    const loadMoreSuccess = await loadMorePostsForRequestedProfile(user, offset);
    if (loadMoreSuccess) {
      this.setState((prevState) => ({
        offset: prevState.offset += 5,
        errors: null
      }));
    } else {
      this.setState({
        errors: true
      });
    }
  };

  render () {
    const { postsList } = this.state;
    const { errors } = this.state;
    const { loadMoreRequsetdProfilePostsStart, loadMoreRequsetdProfilePostsDone, loadMoreRequsetdProfilePostsFail } = this.props;
    const { user } = this.props;

    return (
      <div>
        {postsList}
        <LoadMorePosts
          loadMorePosts={this.loadMorePostsForRequestedProfileWithOffset}
          user={user}
          done={loadMoreRequsetdProfilePostsDone}
        />
        {(loadMoreRequsetdProfilePostsFail || errors) && <Errors errors='Something Went Wrong Could Not Load More Posts Please Try Again!!!' />}
        {loadMoreRequsetdProfilePostsStart && <SmallSpinner />}
      </div>
    );
  }
}

export default RequestedProfilePosts;
