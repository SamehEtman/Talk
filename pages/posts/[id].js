import { getSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import PostDetails from '../../components/post-details/PostDetails';
import { connectDB } from '../../lib/db-uitl';
import { ObjectId } from 'mongodb';
const PostDetailsPage = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsLoading(false);
      else router.replace('/auth');
    });
  }, []);
  if (isLoading) return <div></div>;
  return <PostDetails post={post} />;
};

export async function getStaticProps(context) {
  const id = context.params.id;
  const client = await connectDB();
  const db = client.db();
  const objId = new ObjectId(id);
  let post = await db.collection('blogs').findOne({ _id: objId });
  // the next is to stringify _id , I know it's stupid but hey , it works
  post = JSON.parse(JSON.stringify(post));
  client.close();
  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
}
export async function getStaticPaths(context) {
  const client = await connectDB();
  const db = client.db();
  let blogs = await db.collection('blogs').find().toArray();
  // the next is to stringify _id , I know it's stupid but hey , it works
  blogs = JSON.parse(JSON.stringify(blogs));
  client.close();
  const ids = blogs.map((post) => {
    return {
      params: {
        id: post._id,
      },
    };
  });
  return {
    paths: ids,
    fallback: false,
  };
}

export default PostDetailsPage;
