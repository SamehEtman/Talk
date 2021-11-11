import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import classes from './MainNav.module.css';
const MainNav = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log(session);
  const onLogout = () => {
    console.log('clicked');
    signOut({redirect : false});
    router.push('/');
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
