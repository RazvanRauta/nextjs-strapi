/**
 * @author Razvan Rauta
 * 21/04/2020
 * 19:22
 */

import React from 'react'
import Header from '../components/Layout/Header/Header'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../utils/apollo'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import theme from 'components/Layout/Theme/Theme'
import GlobalStyles from 'components/Layout/Theme/GlobalStyles'
import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo.config'

function KlikaTech({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <DefaultSeo {...SEO} />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default KlikaTech
