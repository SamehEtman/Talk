import Welcome from '../components/home/Welcome';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation('common');

  return <Welcome msg={t('msg')} sign={t('sign')} browse={t('browse')} />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
export default HomePage;
