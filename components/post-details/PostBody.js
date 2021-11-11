import classes from './event-logistics.module.css';
import Image from 'next/image';
const PostBody = ({ title, content, image, owner }) => {
  console.log(title, content, image);
  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={image} alt="{title}" width={320} height={320} />
      </div>
      <ul className={classes.list}>
        <li className={classes.item}>
          <span className={classes.content}>{content}</span>
        </li>
        <span className={classes.content}>By : {owner}</span>
      </ul>
    </section>
  );
};

export default PostBody;
