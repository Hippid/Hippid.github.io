// CommentForm.js
import React from 'react';
import PropTypes from 'prop-types';

// Use ES6 arrow function, since we don't use lifecyclehooks | refs.
// State is kept in parent CommentBox and passed trough as prop.
const CommentForm = (props) => {
  const {
    submitComment, author, text, handleChangeText,
  } = props;
  return (
    <form onSubmit={submitComment}>
      <input id="authorInput" type="text" name="author" value={author} onChange={handleChangeText} placeholder="Your name" />
      <input id="commentInput" type="text" name="text" value={text} onChange={handleChangeText} placeholder="Say something" />
      <button type="submit">Submit</button>
    </form>
  );
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  author: PropTypes.string,
};

CommentForm.defaultProps = {
  text: '',
  author: '',
};

export default CommentForm;
