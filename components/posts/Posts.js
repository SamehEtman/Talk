import PostList from './PostList';
import AddPost from './AddPost';
import React from 'react';
import DeleteModal from './DeleteModal';
const Posts = ({ posts }) => {
  return (
    <React.Fragment>
      <AddPost />
      <PostList posts={posts} />
    </React.Fragment>
  );
};

export default Posts;
