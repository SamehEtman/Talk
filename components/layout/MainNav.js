import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect } from 'react';

import classes from './MainNav.module.css';
const MainNav = () => {
  const [session, loading] = useSession();
  const onLogout = () => {
    console.log('clicked');
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Friends</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          )}
          {session && (
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
