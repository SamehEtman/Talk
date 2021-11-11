import classes from './event-logistics.module.css';
import Image from 'next/image';
const PostBody = ({ title, content, image }) => {
  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={image} alt={title} width={320} height={320} />
      </div>
      <ul className={classes.list}>
        <li className={classes.item}>
          <span className={classes.content}>{content}</span>
        </li>
      </ul>
    </section>
  );
};

export default PostBody;
