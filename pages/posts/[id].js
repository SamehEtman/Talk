import { getSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

export async function getServerSideProps({ params, locale }) {
  const id = params.id;
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
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}

export default PostDetailsPage;
