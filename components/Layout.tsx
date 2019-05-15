import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";
import Head from 'next/head';

import Header from './Header'


@inject("store")
@observer
class Layout extends Component {

  render () {
    const { store, children } = this.props;

    return (
      <Fragment>
        <Head>
          <title>reiwa no bustimer</title>
          <meta name="format-detection" content="telephome=no" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="keywords" content="bustimer,SFC,sfc,バス" />
          <meta name="description" content="バス通学するSFC生のサポートアプリです。" />
          <meta property="og:title" content="reiwa no bustimer" />
          <meta property="og:description" content="バス通学するSFC生のサポートアプリです。" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={store.bustimerUrl} />
          <meta property="og:image" content="https://bustimer.keioac.jp/static/icon.png" />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="300" />
          <meta property="og:site_name" content="reiwa no bustimer" />

          <meta property="fb:app_id" content="" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={store.bustimerUrl} />
          <meta name="twitter:title" content="reiwa no bustimer" />
          <meta name="twitter:description" content="バス通学するSFC生のサポートアプリです。" />
          <meta name="twitter:image" content={`${store.bustimerUrl}/static/icon.png`} />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   
          <meta name="theme-color" content="#ff6600" />
          <link rel="apple-touch-icon" href="/static/img/icon.png" />
          <meta name="apple-mobile-web-app-title" content="bustimer" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>

        <Header />

        {children}

        <style jsx global>
          {`
            * {
              box-sizing: border-box;
              vertical-align: middle;
            }

            body {
              margin: 0;
              font-family: HelveticaNeue;
            }
          `}
        </style>
      </Fragment>
    )
  }
}

export default Layout;
