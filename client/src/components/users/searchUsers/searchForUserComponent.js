import React, { PureComponent } from 'react';
import Button from '../../standardLayout/button';
import SearchResults from './searchResults';
import Errors from '../../common/errors';
import Spinner from '../../standardLayout/spinner';
import './searchUsers.css';

class SearchForUserComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  componentWillMount () {
    this.props.foundUsers.length = 0;
  }

  searchForFriendHandler = () => {
    if (this.state.searchTerm < 3) return;
    const { searchForFriends } = this.props.actions;
    searchForFriends(this.state.searchTerm);
  };

  submitSearchForFriends = (evt) => {
    evt.preventDefault();
    if (!this.state.searchTerm) return;
    const { searchForFriends } = this.props.actions;
    searchForFriends(this.state.searchTerm);
  };

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  addNewFriend = (users, element) => {
    const { addNewFriend } = this.props.actions;
    addNewFriend(users, element);
  };

  render () {
    const { foundUsers, searchForFriendsError, searchForFriendStart, userID } = this.props;
    return (
      <div>
        <h3 id='search-hdr'>Search For Friends</h3>
        {searchForFriendsError && <Errors errors='Something Went Wrong Please Try Again' />}
        <form onSubmit={this.submitSearchForFriends}>
          <div className='form-group'>
            <input 
              className='form-control' 
              type='text' name='searchTerm' 
              value={this.state.searchTerm} 
              onChange={this.handleInputChange}
              onKeyPress={this.searchForFriendHandler}
              placeholder='Search...' 
              />
          </div>
          <Button 
            type='submit'
            btnClass='btn btn-primary'
            btnText='Search'
          />
        </form>
        <SearchResults userID={userID} foundUsers={foundUsers} addNewFriend={this.addNewFriend}/>
        {searchForFriendStart && <Spinner />}
      </div>
    );
  }
}

export default SearchForUserComponent;
