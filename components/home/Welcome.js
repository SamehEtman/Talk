import classes from './Welcome.module.css';
import { getSession, useSession } from 'next-auth/client';
import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
function Welcome({sign , msg , browse }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  }, []);

  return (
    <section className={classes.starting}>
      <h1>{msg}</h1>
      {!isLoggedIn && (
        <h1 className={classes.link}>
          <Link href="/auth">{sign}</Link>
        </h1>
      )}
      {isLoggedIn && (
        <h1 className={classes.link}>
          <Link href="/posts">{browse}</Link>
        </h1>
      )}
    </section>
  );
}

export default Welcome;
