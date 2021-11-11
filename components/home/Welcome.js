import classes from './Welcome.module.css';
import { getSession, useSession } from 'next-auth/client';
import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
function Welcome() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  }, []);

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {!isLoggedIn && (
        <h1 className={classes.link}>
          <Link href="/auth">Sign up now!</Link>
        </h1>
      )}
      {isLoggedIn && (
        <h1 className={classes.link}>
          <Link href="/posts">Browse blogs!</Link>
        </h1>
      )}
    </section>
  );
}

export default Welcome;
