/**
 * @author Razvan Rauta
 * 25.04.2020
 * 16:27
 */

import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const GRAPHQL_URL = process.env.API_URL

let apolloClient

const link = new HttpLink({
  uri: GRAPHQL_URL + '/graphql',
})

function createApolloClient(initialState  = null) {
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })

  return new ApolloClient({
    link,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
