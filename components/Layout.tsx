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

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" />
      </Head>

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
