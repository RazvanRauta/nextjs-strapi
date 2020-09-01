/**
 * @author Razvan Rauta
 * 29.08.2020
 * 22:53
 */

import React, { FunctionComponent } from 'react'
import { Container } from '@chakra-ui/core'
import {
  Maybe,
  NewsPosts,
  NewsPostsDocument,
  UploadFile,
} from '@/generated/graphql'
import { initializeApollo } from '@/utils/apollo'
import NewsGrid from '@/components/NewsGrid/NewsGrid'

interface OwnProps {
  newsPosts?: Maybe<
    Array<
      Maybe<
        { __typename?: 'NewsPosts' } & Pick<
          NewsPosts,
          'id' | 'Slug' | 'Title' | 'Date' | 'Text'
        > & {
            Image?: Maybe<
              { __typename?: 'UploadFile' } & Pick<
                UploadFile,
                'width' | 'height' | 'formats'
              >
            >
          }
      >
    >
  >
  error?: any
  loading?: boolean
}

type Props = OwnProps

const News: FunctionComponent<Props> = ({ newsPosts, error, loading }) => {
  if (loading) return <p>Loading</p>

  if (error) {
    console.log(error)
    return <p>There was a error</p>
  }

  return (
    <Container maxW="xl" centerContent>
      <NewsGrid newsPosts={newsPosts} />
    </Container>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const allNewsPostsPostsQueryVars = {
    limit: 100,
    start: 0,
  }

  const { data, loading, error } = await apolloClient.query({
    query: NewsPostsDocument,
    variables: allNewsPostsPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      newsPosts: data?.newsPosts,
      loading,
      error: error ?? null,
    },
    revalidate: 1,
  }
}

// @ts-ignore
export default News
