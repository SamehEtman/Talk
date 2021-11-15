import { signOut, useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import classes from './MainNav.module.css';
const MainNav = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const onLogout = () => {
    signOut();
  };
  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsLogged(true);
      else setIsLogged(false);
    });
  }, []);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Talk</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          {!isLogged && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {isLogged && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {isLogged && (
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          )}
          {isLogged && (
            <li onClick={onLogout}>
              <Link href="/">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
