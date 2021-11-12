import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
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

export default AuthPage;
