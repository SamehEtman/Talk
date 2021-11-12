import dynamic from 'next/dynamic';
import { connectDB } from '../../lib/db-uitl';
const Posts = dynamic(() => import('../../components/posts/Posts'), {
  ssr: false,
});

import { getSession } from 'next-auth/client';
const PostsPage = ({ posts }) => {
  return <Posts posts={posts} />;
};

export async function getServerSideProps({ req, res }) {
  const client = await connectDB();
  const db = client.db();
  let blogs = await db.collection('blogs').find().toArray();
  // the next is to stringify _id , I know it's stupid but hey , it works
  blogs = JSON.parse(JSON.stringify(blogs));
  client.close();
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
