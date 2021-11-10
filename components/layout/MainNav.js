import Link from 'next/link';
import classes from './MainNav.module.css';
const MainNav = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href ='/' >Friends</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/auth">login</Link>
          </li>
          <li>
            <Link href="/profile">profile</Link>
          </li>
          <li>
            <Link href="/posts">posts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
