/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 00:50
 */

import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { wrapper } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
