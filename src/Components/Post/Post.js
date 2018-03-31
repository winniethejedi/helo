import React, { Component } from 'react';
import './Post.css';
import Nav from '../Nav/Nav';

class Post extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <h1>Post</h1>
      </div>
    );
  }
}

export default Post;