// CommentBox.js
import React, { Component } from 'react';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './CommentBox.css';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      text: '',
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    // initial load comments.
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      // refresh comments every 5 seconds.
      this.pollInterval = setInterval(this.loadCommentsFromServer, 5000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer = () => {
    // console.log("loadCommentsFromServer");
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch('/api/comments/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    const newname = e.target.name;
    const newval = e.target.value;
    console.log(`Changed state: ${newname}: ${newval}`);
    newState[newname] = newval;
    newState.error = null;
    this.setState(newState);
  }

  onUpdateComment = (e) => {
    const { id } = e.target;
    if (!id) {
      this.setState({ error: 'Invalid id.' });
      return;
    }

    console.log(`onUpdateComment id: ${id}`);

    const { author, text, data } = this.state;
    if (!author) {
      this.setState({ error: 'Invalid author.' });
      return;
    }

    if (!text) {
      this.setState({ error: 'Invalid comment.' });
      return;
    }

    const oldComment = data.find(c => c._id === id);
    if (!oldComment) {
      this.setState({ error: 'Could not find old comment.' });
      return;
    }

    const oldAuthor = oldComment.author;
    const oldCommentT = oldComment.text;

    console.log(`onUpdateComment from ${oldAuthor} ${oldCommentT} to ${author} ${text}`);
    fetch(`/api/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) {
        this.setState({ error: res.error.message || res.error });
      } else {
        this.loadCommentsFromServer();
      }
    });
  }

  onDeleteComment = (e) => {
    const { id } = e.currentTarget;
    const { data } = this.state;
    const i = data.findIndex(c => c._id === id);
    const newData = [
      ...data.slice(0, i),
      ...data.slice(i + 1),
    ];
    this.setState({ newData });
    fetch(`api/comments/${id}`, { method: 'DELETE' })
      .then(res => res.json()).then((res) => {
        if (!res.success) {
          this.setState({ error: res.error });
        } else {
          this.loadCommentsFromServer();
        }
      });
  }

  submitComment = (e) => {
    e.preventDefault();
    const { author, text } = this.state;
    if (!author) {
      this.setState({ error: 'Invalid author.' });
      return;
    }

    if (!text) {
      this.setState({ error: 'Invalid comment.' });
      return;
    }

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) {
        this.setState({ error: res.error.message || res.error });
      } else {
        this.setState({ text: '', error: null });
        this.loadCommentsFromServer();
      }
    });
  }

  render() {
    const {
      data, author, text, error,
    } = this.state;
    return (
      <div className="commentOuter">
        <div className="commentInner">
          <div className="comments" id="Comments">
            <CommentList data={data} handleDeleteComment={this.onDeleteComment} handleUpdateComment={this.onUpdateComment} />
          </div>
          <div className="form">
            <CommentForm author={author} text={text} handleChangeText={this.onChangeText} submitComment={this.submitComment} />
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

export default CommentBox;
