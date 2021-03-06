import Image from 'next/image';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import classes from './PostItem.module.css';
import Button from '../ui/button';
import { getSession, useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DeletePost from './DeletePost';
const PostItem = ({ email , id, owner, title, summary, exploreLink, image }) => {
  
  return (
    <li className={classes.item}>
      <Image
        src={image}
        alt={title}
        width={220}
        height={220}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
        </div>
        <div className={classes.summary}>
          <p>{summary}</p>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>
            <a className={classes.btn}>
              <span>See Post</span>
              <span className={classes.icon}>
                <ArrowRightIcon />
              </span>
            </a>
          </Link>
        </div>
        {email == owner && <DeletePost id={id} />}
      </div>
    </li>
  );
};
export default PostItem;
