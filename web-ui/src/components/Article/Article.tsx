/**
 * @author Razvan Rauta
 * 30.08.2020
 * 15:09
 */
// @flow
import React, { FunctionComponent, Fragment } from 'react'
import { Maybe, Scalars, UploadFile } from '../../generated/graphql'
import { Box, Container, Heading, Image as ChakraImage } from '@chakra-ui/core'
import { NextSeo, NextSeoProps } from 'next-seo'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

interface OwnProps {
  Title?: Maybe<Scalars['String']>
  Image?: Maybe<
    { __typename?: 'UploadFile' } & Pick<
      UploadFile,
      'width' | 'height' | 'formats'
    >
  >
  Text?: Maybe<Scalars['String']>
  Date?: Maybe<Scalars['Date']>
}

type Props = OwnProps

const Article: FunctionComponent<Props> = ({ Title, Image, Text, Date }) => {
  const SEO: NextSeoProps = {
    title: Title ?? undefined,
    description: `${Text?.substring(0, 300)}...`,
    openGraph: {
      title: Title ?? undefined,
      description: `${Text?.substring(0, 300)}...`,
      images: [
        {
          url: `${process.env.ROOT_URL + Image?.formats.small.url}`,
          width: Image?.width ?? undefined,
          height: Image?.height ?? undefined,
          alt: Title ?? undefined,
        },
      ],
    },
  }
  return (
    <Fragment>
      <NextSeo {...SEO} />
      <Container maxWidth={'l'} centerContent>
        <ChakraImage
          loading={'lazy'}
          src={`${process.env.ROOT_URL + Image?.formats.small.url}`}
          srcSet={`${process.env.ROOT_URL + Image?.formats.small.url}`}
          maxWidth={'100%'}
          width={800}
        />
        <Heading>{Title}</Heading>
        <Moment format="MMM Do, YYYY">{Date}</Moment>
        <Box>
          <ReactMarkdown source={Text ?? undefined} />
        </Box>
      </Container>
    </Fragment>
  )
}

export default Article
