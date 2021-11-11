import Image from 'next/image';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import classes from './PostItem.module.css';
import Button from '../ui/button';
const PostItem = ({ title, summary, exploreLink, image }) => {
  console.log(image);
  return (
    <li className={classes.item}>
      <Image src={image} alt={title} width={220} height={220}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
        </div>
        <div className={classes.summary}>
          <p>{summary}</p>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>See Post</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
export default PostItem;
