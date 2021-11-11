import PostDetails from '../../components/post-details/PostDetails';
import { fetchAllPosts, fetchById } from '../../lib/api-utils';
const dummyData = {
  _id: 1,
  title: 'hello',
  summary: 'hello world',
  content: 'Dennis Richie is my bitch',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/e/e6/Dennis_Ritchie.jpg',
};
const PostDetailsPage = ({ post }) => {
  console.log(post);
  return <PostDetails post={post} />;
};

export async function getStaticProps(context) {
  const id = context.params.id;
  const { post } = await fetchById(id);
  return {
    props: {
      post,
    },
    revalidate : 3600
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
