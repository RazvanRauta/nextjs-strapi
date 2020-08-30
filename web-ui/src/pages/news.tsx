/**
 * @author Razvan Rauta
 * 29.08.2020
 * 22:53
 */

import React, { FunctionComponent } from 'react'
import { Box, Text } from '@chakra-ui/core'
import {
  NewsPosts,
  NewsPostsDocument,
  useNewsPostsQuery,
} from '../generated/graphql'
import { Layout } from '@/components/Layout/Layout'
import { initializeApollo } from '../utils/apollo'
import { NormalizedCacheObject } from '@apollo/client'

interface OwnProps {}

type Props = OwnProps

const News: FunctionComponent<Props> = () => {
  const { data, loading, error } = useNewsPostsQuery({
    variables: { limit: 100, start: 0 },
  })
  if (loading) return <p>Loading</p>

  if (error) return <p>{error}</p>

  return (
    <Layout title={'News'}>
      <Box width={{ base: 1, sm: 1 / 2, md: 1 / 4 }}>
        {data?.newsPosts?.map((post) => (
          <Text key={post?.id}>{post?.Title}</Text>
        ))}
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const allNewsPostsPostsQueryVars = {
    limit: 100,
    start: 0,
  }

  await apolloClient.query({
    query: NewsPostsDocument,
    variables: allNewsPostsPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(true),
    },
    revalidate: 1,
  }
}

export default News
