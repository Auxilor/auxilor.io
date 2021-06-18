import '../styles/style.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-filename-extension
  return <Component {...pageProps} />;
}

export default MyApp;
