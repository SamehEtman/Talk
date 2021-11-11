import Posts from '../../components/posts/Posts';
import { fetchAllPosts, addPost } from '../../lib/api-utils';
import { getSession } from 'next-auth/client';
const PostsPage = ({ posts }) => {
  return <Posts posts={posts} />;
};

export async function getServerSideProps({ req, res }) {
  const { blogs } = await fetchAllPosts();
  const session = await getSession({ req });
  if (session)
    return {
      props: { posts: blogs },
    };
  return {
    redirect: {
      destination: '/auth',
      permanent: false,
    },
  };
}

export default PostsPage;
