import PostDetails from '../../components/post-details/PostDetails';
const dummyData = {
  _id: 1,
  title: 'hello',
  summary: 'hello world',
  content: 'Dennis Richie is my bitch',
  image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Dennis_Ritchie.jpg',
};
const PostDetailsPage = () => {
  return <PostDetails post={dummyData} />;
};

export default PostDetailsPage;
