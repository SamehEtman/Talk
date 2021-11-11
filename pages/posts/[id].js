import { getSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import PostDetails from '../../components/post-details/PostDetails';
import { fetchAllPosts, fetchById } from '../../lib/api-utils';

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
  const { post } = await fetchById(id);
  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
}
export async function getStaticPaths(context) {
  const { blogs } = await fetchAllPosts();
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
