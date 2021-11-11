import PostBody from './PostBody';
import PostHeader from './PostHeader';

const PostDetails = ({ post }) => {
  return (
    <section>
      <PostHeader title={post.title} />
      <PostBody content={post.content} title={post.title} image={post.image} owner = {post.owner}/>
    </section>
  );
};

export default PostDetails;
