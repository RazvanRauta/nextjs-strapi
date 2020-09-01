/**
 * @author Razvan Rauta
 * 30.08.2020
 * 14:22
 */

import React, { FunctionComponent, Fragment } from 'react'
import { Button, Grid } from '@chakra-ui/core'
import NewsCard from '@/components/NewsCard/NewsCard'
import { NewsPosts, useNewsPostsQuery } from '@/generated/graphql'
import { NetworkStatus } from '@apollo/client'
import Error from 'next/error'

interface OwnProps {}

type Props = OwnProps

const NewsGrid: FunctionComponent<Props> = () => {
  const { loading, error, data, fetchMore, networkStatus } = useNewsPostsQuery({
    variables: { start: 0, limit: 6 },
  })
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const {
    // @ts-ignore
    newsPosts,
    // @ts-ignore
    newsPostsConnection: {
      aggregate: { totalCount },
    },
  } = data

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        start: newsPosts.length,
      },
    })
  }

  if (error) return <Error statusCode={500} />

  if (loading && !loadingMorePosts) return <div>Loading</div>

  const areMorePosts = newsPosts.length < totalCount

  return (
    <Fragment>
      <Grid templateColumns={'repeat(3,1fr)'}>
        {newsPosts?.map((post: NewsPosts) => (
          <NewsCard key={post?.id} {...post} />
        ))}
      </Grid>
      {areMorePosts && (
        <Button isLoading={loadingMorePosts} onClick={() => loadMorePosts()}>
          Show More
        </Button>
      )}
    </Fragment>
  )
}

export default NewsGrid
