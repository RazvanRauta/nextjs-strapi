import React from 'react'
import { ChakraProvider } from '@chakra-ui/core'
import { DefaultSeo } from 'next-seo'
import { SEO } from '../../next-seo.config'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/utils/apollo'
import webUiTheme from '@/theme/theme'
import { Layout } from '@/layout/Layout'

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={webUiTheme} resetCSS>
        <DefaultSeo {...SEO} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
