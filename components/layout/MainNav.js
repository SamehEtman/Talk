import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './MainNav.module.css';
const MainNav = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
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
        <Link href="/">{t('logo')}</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          {!isLogged && (
            <li>
              <Link href="/auth">{t('login')}</Link>
            </li>
          )}
          {isLogged && (
            <li>
              <Link href="/profile">{t('profile')}</Link>
            </li>
          )}
          {isLogged && (
            <li>
              <Link href="/posts">{t('posts')}</Link>
            </li>
          )}
          {isLogged && (
            <li onClick={onLogout}>
              <Link href="/">{t('logout')}</Link>
            </li>
          )}
          <li>
            <Link
              href={router.asPath}
              locale={router.locale === 'en' ? 'ar' : 'en'}
            >
              {router.locale === 'en' ? 'العربية' : 'English'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
