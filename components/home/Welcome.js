import classes from './Welcome.module.css';
import { getSession, useSession } from 'next-auth/client';
import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
function Welcome({ sign, msg, browse }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsLoggedIn('yes');
      else setIsLoggedIn('no');
    });
  }, []);

  return (
    <section className={classes.starting}>
      <h1>{msg}</h1>

      <h1 className={classes.link}>
        <Link href="/posts">
          {isLoggedIn === 'yes' ? browse : isLoggedIn === 'no' ? sign : ''}
        </Link>
      </h1>
    </section>
  );
}

export default Welcome;
