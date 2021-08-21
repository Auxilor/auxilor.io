import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>
        <header className="site-header" id="header">
          <h1 className="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
        </header>

        <div className="main-content">
          <i className="fa fa-check main-content__checkmark" id="checkmark"></i>
          <p className="main-content__body" data-lead-id="main-content-body">
          Thank you for your payment. Your transaction has been completed and we've emailed you a
          receipt for your purchase. Log in to your PayPal account to view transaction details.

            Come check out our sponsors!
          </p>

          <br/>
          <br/>
          <br/>
          <h2 align="center">
            <a href="https://dedimc.promo/Auxilor">
              <img align="center" src="https://i.imgur.com/L5Q7V18.png" width="800"/>
            </a>

            <br/>
            <br/>
            <a href="https://gamersupps.gg/?afmc=Auxilor">
              <img align="center" src="https://i.imgur.com/adMQkSa.png" width="800"/>
            </a>
          </h2>
        </div>
      </body>
    </>
  );

}
