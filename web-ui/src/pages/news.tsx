/**
 * @author Razvan Rauta
 * 29.08.2020
 * 22:53
 */

import React, { FunctionComponent } from 'react'
import { Container } from '@chakra-ui/core'
import { NewsPostsDocument } from '@/generated/graphql'
import { initializeApollo } from '@/utils/apollo'
import NewsGrid from '@/components/NewsGrid/NewsGrid'

interface OwnProps {}

type Props = OwnProps

const News: FunctionComponent<Props> = () => {
  return (
    <Container maxW="xl" centerContent>
      <NewsGrid />
    </Container>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const allNewsPostsPostsQueryVars = {
    limit: 6,
    start: 0,
  }

  await apolloClient.query({
    query: NewsPostsDocument,
    variables: allNewsPostsPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

// @ts-ignore
export default News
