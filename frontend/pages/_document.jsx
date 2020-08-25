/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 19:47
 */

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap"
            as="style"
            crossOrigin=""
          />
          <script src="https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
