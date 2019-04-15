import React, { Fragment } from 'react';
import Head from 'next/head';
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>reiwa no bustimer</title>
        <meta name="format-detection" content="telephome=no" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SFC生のバス通学サポートサービス" />
        <meta property="og:title" content="reiwa no bustimer" />
        <meta property="og:description" content="SFC生のバス通学サポートサービス" />
        <meta name="keywords" content="bustimer,SFC,sfc,バス" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bustimer.sfc.keioac.jp" />

        <meta property="og:image" content="https://bustimer.sfc.keioac.jp/static/icon.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="300" />
        <meta property="og:site_name" content="reiwa no bustimer" />
        <meta property="fb:app_id" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://bustimer.sfc.keioac.jp" />
        <meta name="twitter:title" content="reiwa no bustimer" />
        <meta name="twitter:description" content="SFC生のバス通学サポートサービス" />
        <meta name="twitter:image" content="https://bustimer.sfc.keioac.jp/static/icon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 
        <meta name="theme-color" content="#ff6600" />
        <link rel="apple-touch-icon" href="/static/img/icon.png" />
        <meta name="apple-mobile-web-app-title" content="bustimer" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <Header
        className="header"
        color="#000000"
      />

      {props.children}

      <style jsx global>
        {`
          * {
            box-sizing: border-box;
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

export default Layout;
