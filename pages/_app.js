import '../styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from "nprogress"
import TopBar from '../components/TopBar';

Router.events.on('routeChangeStart', (url) => {console.log(`Loading ${url}`);NProgress.start()});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
      <TopBar />
      <main className="beans">
        <Component {...pageProps} />;
      </main>
    </>
  )
}

export default MyApp;
