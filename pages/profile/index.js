import { getSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import { connectDB } from '../../lib/db-uitl';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Profile = dynamic(() => import('../../components/profile/Profile'), {
  ssr: false,
});

const ProfilePage = ({ user }) => {
  return <Profile user={user} />;
};
export async function getServerSideProps({ req , locale}) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const client = await connectDB();
  const db = client.db();
  const email = session.user.email;
  let user = await db.collection('users').findOne({ email });
  user = JSON.parse(JSON.stringify(user));
  if (!user) {
  }

  client.close();
  return {
    props: { user ,...(await serverSideTranslations(locale, ['common', 'footer'])),},
  };
}
export default ProfilePage;
