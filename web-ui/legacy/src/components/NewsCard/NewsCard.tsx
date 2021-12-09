/**
 * @author Razvan Rauta
 * 30.08.2020
 * 14:29
 */

import React, { FunctionComponent } from 'react'
import { Maybe, Scalars, UploadFile } from '@/generated/graphql'
import {
  Box,
  Image as ChakraImage,
  Text as CText,
  Flex,
  useColorMode,
} from '@chakra-ui/core'
import { Link } from '@/layout/NextLink'
import Moment from 'react-moment'

interface OwnProps {
  Title?: Scalars['String'] | null
  Image?: Maybe<
    { __typename?: 'UploadFile' } & Pick<
      UploadFile,
      'width' | 'height' | 'formats'
    >
  >
  Slug?: Scalars['String'] | null
  Date?: Scalars['Date'] | null
  Text?: Scalars['String'] | null
}

type Props = OwnProps

const NewsCard: FunctionComponent<Props> = ({
  Title,
  Image,
  Slug,
  Date,
  Text,
}) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.200', dark: 'red.200' }
  const color = { light: 'dark', dark: 'gray.800' }

  return (
    <Link
      boxShadow="none"
      _hover={{ textDecoration: 'none' }}
      rel="prefetch"
      href={`article/${Slug}`}
    >
      <Box maxWidth={360} padding={4}>
        <ChakraImage
          loading={'lazy'}
          mx="auto"
          maxHeight={200}
          srcSet={`${Image?.formats.thumbnail.url} 1x,
            ${Image?.formats.small.url} 1.5x,
            ${Image?.formats.medium.url} 2x`}
        />
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={4}
          mt={2}
        >
          <CText
            rounded="full"
            px={2}
            bg={bgColor[colorMode]}
            color={color[colorMode]}
          >
            {Title}
          </CText>
          <Box
            rounded="full"
            bg={bgColor[colorMode]}
            color={color[colorMode]}
            px={2}
          >
            <Moment format="MMM Do, YYYY">{Date}</Moment>
          </Box>
        </Flex>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={4}
          mt={2}
        >
          <CText>{`${Text?.substring(0, 100)}...`}</CText>
        </Flex>
      </Box>
    </Link>
  )
}

export default NewsCard
