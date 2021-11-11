import PostItem from './PostItem';
import classes from './PostList.module.css';
const PostList = ({ posts }) => {
  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <PostItem
          key={post._id}
          title={post.title}
          summary={post.summary}
          image={post.image}
          exploreLink={`/posts/${post._id}`}
        />
      );
    });
  };

  return (
    <ul className={classes.list}>
      {renderPosts()}
    </ul>
  );
};

export default PostList;
