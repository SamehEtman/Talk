import classes from './PostHeader.module.css';

const PostHeader = ({ title }) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default PostHeader;
