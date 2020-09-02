/**
 * @author Razvan Rauta
 * 30.08.2020
 * 14:22
 */

import React, { FunctionComponent, Fragment, useState } from 'react'
import { Button, Grid } from '@chakra-ui/core'
import NewsCard from '@/components/NewsCard/NewsCard'
import {
  NewsPosts,
  useNewsPostsQuery,
  NewsPostsQueryVariables,
} from '@/generated/graphql'
import Error from 'next/error'

interface OwnProps {}

type Props = OwnProps

const NewsGrid: FunctionComponent<Props> = () => {
  const vars: NewsPostsQueryVariables = {
    limit: 3,
    start: 0,
  }
  const { loading, error, data, fetchMore } = useNewsPostsQuery({
    variables: vars,
  })

  const [load, setLoading] = useState(false)

  const {
    // @ts-ignore
    newsPosts,
    // @ts-ignore
    newsPostsConnection: {
      aggregate: { totalCount },
    },
  } = data

  const loadMorePosts = () => {
    setLoading(true)
    fetchMore({
      variables: {
        start: newsPosts.length,
        limit: 3,
      },
    }).then(() => setLoading(false))
  }

  if (error) return <Error statusCode={500} />

  if (loading) return <div>Loading</div>

  const areMorePosts = newsPosts.length < totalCount

  return (
    <Fragment>
      <Grid templateColumns={'repeat(3,1fr)'}>
        {newsPosts?.map((post: NewsPosts) => (
          <NewsCard key={post?.id} {...post} />
        ))}
      </Grid>
      {areMorePosts && (
        <Button
          mt={10}
          bg="teal.400"
          isLoading={load}
          onClick={() => loadMorePosts()}
        >
          Show More
        </Button>
      )}
    </Fragment>
  )
}

export default NewsGrid
