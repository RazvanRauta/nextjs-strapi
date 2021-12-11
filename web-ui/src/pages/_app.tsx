/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 00:50
 */

import { AppProps } from 'next/app';

import '@/styles/globals.css';

import ProgressBar from '@/components/ProgressBar';

import { wrapper } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressBar
        color='#29D'
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
