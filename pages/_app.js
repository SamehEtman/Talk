import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import { NotificationContextProvider } from '../store/NotificationContext';
import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const locale = router.locale;
  useEffect(() => {
    if (locale === 'ar') document.body.dir = 'rtl';
    else document.body.dir = 'ltr';
  }, [locale]);
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Sameh Posts</title>
          <meta name="description" content="Share your words with the rest of the world" />
          <meta name="robots" content="all" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://www.w3schools.com/w3css/4/w3.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default appWithTranslation(MyApp);
