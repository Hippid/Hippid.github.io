// Comment.js
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { onKeyPress } from '../Common/Input';

const Comment = (props) => {
  const {
    author, children, timestamp, id, handleUpdateComment, handleDeleteComment,
  } = props;
  return (
    <div className="singleComment">
      <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${id}`} />
      <div className="textContent">
        <div className="singleCommentContent">
          <h3>{author}</h3>
          <ReactMarkdown source={children} />
        </div>
        <div className="singleCommentButtons">
          <span className="time">{moment(timestamp).fromNow()}</span>
          <a role="button" tabIndex={0} id={id} onClick={handleUpdateComment} onKeyPress={onKeyPress}>update</a>
          <a role="button" tabIndex={0} id={id} onClick={handleDeleteComment} onKeyPress={onKeyPress}>delete</a>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
