import { CSSReset, ChakraProvider } from '@chakra-ui/core'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import theme from '@chakra-ui/theme'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../utils/apollo'

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
