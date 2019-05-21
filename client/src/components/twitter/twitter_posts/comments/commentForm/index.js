import React, { PureComponent } from 'react';
class CommentForm extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  submitCommentHandler = async (evt) => {
    const { createCommnetForPost, id, addComment } = this.props;
    const { comment } = this.state;
    evt.preventDefault();
    if (!comment) return;
    const result = await createCommnetForPost(id, comment);
    if (result.data.id) addComment(result.data);
    this.setState({comment: ''});
  };

  updateInputField = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      });
  };

  render () {
    return (
      <form className='comment-form' onSubmit={this.submitCommentHandler}>
        <div className='form-group'>
          <input 
          type='text' 
          value={this.state.comment} 
          onChange={this.updateInputField} 
          name='comment' 
          className='form-control' 
          placeholder='Your Comment'
          />
        </div>
      </form>
    );
  }
}

export default CommentForm;
