import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';

import PostItem from './PostItem';
import classes from './PostList.module.css';
const PostList = ({ posts }) => {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    getSession().then(({ user }) => {
      setEmail(user.email);
    });
  });

  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <PostItem
          key={post._id}
          email={email}
          id={post._id}
          owner={post.owner}
          title={post.title}
          summary={post.summary}
          image={post.image}
          exploreLink={`/posts/${post._id}`}
        />
      );
    });
  };

  if (email) return <ul className={classes.list}>{renderPosts()}</ul>;
  else return <div></div>;
};

export default PostList;
