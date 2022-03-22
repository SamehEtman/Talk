import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setIsAllowed(true);
      } else router.replace('/');
    });
  }, []);
  if (isAllowed) return <AuthForm />;
  return <div></div>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
export default AuthPage;
