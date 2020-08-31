/**
 * @author Razvan Rauta
 * 30.08.2020
 * 14:29
 */

import React, { FunctionComponent } from 'react'
import { Maybe, Scalars, UploadFile } from '../../generated/graphql'
import { Box, Image as ChakraImage, Heading } from '@chakra-ui/core'
import { Link } from '@/layout/NextLink'

interface OwnProps {
  Title?: Scalars['String'] | null
  Image?: Maybe<
    { __typename?: 'UploadFile' } & Pick<
      UploadFile,
      'width' | 'height' | 'formats'
    >
  >
  Slug?: Scalars['String'] | null
}

type Props = OwnProps

const NewsCard: FunctionComponent<Props> = ({ Title, Image, Slug }) => {
  return (
    <Link href={`article/${Slug}`}>
      <Box maxWidth={360} padding={10}>
        <ChakraImage
          loading={'lazy'}
          srcSet={`${Image?.formats.thumbnail.url} 1x,
            ${Image?.formats.small.url} 1.5x,
            ${Image?.formats.medium.url} 2x`}
        />
        <Heading>{Title}</Heading>
      </Box>
    </Link>
  )
}

export default NewsCard
