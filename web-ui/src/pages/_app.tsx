import { ChakraProvider } from '@chakra-ui/core'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../utils/apollo'
import webUiTheme from '@/components/Layout/Theme/theme'

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={webUiTheme} resetCSS>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
