/**
 * @author Razvan Rauta
 * 30.08.2020
 * 14:22
 */

import React, { FunctionComponent } from 'react'
import { Grid } from '@chakra-ui/core'
import { Maybe, NewsPosts, UploadFile } from '../../generated/graphql'
import NewsCard from '@/components/NewsCard/NewsCard'

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
}

type Props = OwnProps

const NewsGrid: FunctionComponent<Props> = ({ newsPosts }) => {
  return (
    <Grid templateColumns={'repeat(3,1fr)'}>
      {newsPosts?.map((post) => (
        <NewsCard key={post?.id} {...post} />
      ))}
    </Grid>
  )
}

export default NewsGrid
