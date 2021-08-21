import '../styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

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
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>Auxilor</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700"
          rel="stylesheet" type="text/css"/>
        <style>
            @import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
            @import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
        </style>
        <link rel="stylesheet"
          href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css"></link>
        <script
          src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"/>
        <script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"/>
      </head>
      <main className="beans">
        <Component {...pageProps} />
      </main>
    </>
  );
}

