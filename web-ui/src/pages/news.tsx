/**
 * @author Razvan Rauta
 * 29.08.2020
 * 22:53
 */

import React, { FunctionComponent } from 'react'
import { Container } from '@chakra-ui/core'
import { NewsPostsDocument, useNewsPostsQuery } from '../generated/graphql'
import { Layout } from '@/components/Layout/Layout'
import { initializeApollo } from '../utils/apollo'
import NewsGrid from '@/components/NewsGrid/NewsGrid'

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
      <Container maxW="xl" centerContent>
        <NewsGrid newsPosts={data?.newsPosts} />
      </Container>
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
