import { getSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import { fetchByemail } from '../../lib/api-utils';
const Profile = dynamic(() => import('../../components/profile/Profile'), {
  ssr: false,
});

const ProfilePage = ({user}) => {
  return <Profile user={user} />;
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const user = await fetchByemail(session.user.email);
  return {
    props: { user },
  };
}
export default ProfilePage;
