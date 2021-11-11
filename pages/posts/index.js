import Posts from '../../components/posts/Posts';

const dummyData = [
  {
    _id: 1,
    title: 'hello',
    summary: 'hello world',
    content: 'iam sameh and i love eng. Osama brekaa, NO HOMO THOUUGH',
    image : 'https://www.w3schools.com/images/lamp.jpg'
  },
  {
    _id: 2,
    title: 'hello2',
    summary: 'hello world2',
    content: 'iam sameh and i love eng. Osama brekaa, NO HOMO THOUUGH',
    image : 'https://www.w3schools.com/images/lamp.jpg'

  },
];

const PostsPage = () => {
  return <Posts posts={dummyData} />;
};

export default PostsPage;
