import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

// nextjs router events
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
// cancel loader if error occurs during routeChange
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
