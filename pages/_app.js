import '../styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BaseEditor/BaseEditor.scss';
import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import TopBar from '../components/TopBar';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCaretRight } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faCaretRight);

export default function App({
  Component,
  pageProps
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>Auxilor</title>
      </Head>
      <TopBar/>
      <div className="beans">
        <Component {...pageProps} />
      </div>
    </>
  );
}

