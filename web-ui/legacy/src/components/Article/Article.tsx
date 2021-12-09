/**
 * @author Razvan Rauta
 * 30.08.2020
 * 15:09
 */
// @flow
import React, { FunctionComponent, Fragment } from 'react'
import { useArticleQuery } from '@/generated/graphql'
import {
  Box,
  Container,
  Heading,
  Image as ChakraImage,
  Flex,
} from '@chakra-ui/core'
import {
  NextSeo,
  NextSeoProps,
  ArticleJsonLd,
  ArticleJsonLdProps,
} from 'next-seo'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Error from 'next/error'

interface OwnProps {}

type Props = OwnProps

const Article: FunctionComponent<Props> = () => {
  const router = useRouter()

  const { data, error, loading } = useArticleQuery({
    // @ts-ignore
    variables: { id: router.query.slug },
  })

  if (error) return <Error statusCode={500} />

  if (loading || router.isFallback) return <Box>Loading</Box>

  // @ts-ignore
  const { newsPosts } = data
  const { Title, Image, Text, Date, Slug } = newsPosts[0]

  const SEO: NextSeoProps = {
    title: Title ?? undefined,
    description: `${Text?.substring(0, 300)}...`,
    openGraph: {
      title: Title ?? undefined,
      description: `${Text?.substring(0, 300)}...`,
      images: [
        {
          url: Image?.formats.small.url,
          width: Image?.formats.small.width ?? undefined,
          height: Image?.formats.small.height ?? undefined,
          alt: Title ?? undefined,
        },
        {
          url: Image?.formats.medium.url,
          width: Image?.formats.medium.width ?? undefined,
          height: Image?.formats.medium.height ?? undefined,
          alt: Title ?? undefined,
        },
        {
          url: Image?.formats.large.url,
          width: Image?.formats.large.width ?? undefined,
          height: Image?.formats.large.height ?? undefined,
          alt: Title ?? undefined,
        },
      ],
    },
  }

  const JsonLD: ArticleJsonLdProps = {
    title: Title ?? '',
    authorName: 'Razvan',
    dateModified: Date,
    datePublished: Date,
    description: `${Text?.substring(0, 300)}...`,
    images: [
      Image?.formats.small.url,
      Image?.formats.medium.url,
      Image?.formats.large.url,
    ],
    url: `${process.env.ROOT_URL}/article/${Slug}`,
    publisherName: 'RRazvan',
    publisherLogo: `data:image/svg+xml,%3csvg width='582' height='582' viewBox='0 0 582 582' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3crect width='582' height='582' rx='291' fill='url(%23paint0_linear)'/%3e %3cpath d='M157.521 303.421L355.881 106.426C359.587 102.746 365.55 107.225 363.049 111.809L289.22 247.123C287.573 250.141 289.758 253.821 293.196 253.821H420.782C424.892 253.821 426.877 258.857 423.872 261.661L200.293 470.326C196.284 474.067 190.317 468.796 193.536 464.356L299.373 318.351C301.543 315.357 299.404 311.164 295.706 311.164H160.713C156.67 311.164 154.653 306.27 157.521 303.421Z' fill='white'/%3e %3cdefs%3e %3clinearGradient id='paint0_linear' x1='291' y1='0' x2='291' y2='582' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%237BCBD4'/%3e %3cstop offset='1' stop-color='%2329C6B7'/%3e %3c/linearGradient%3e %3c/defs%3e %3c/svg%3e`,
  }

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <ArticleJsonLd {...JsonLD} />
      <Container maxWidth={'l'} centerContent>
        <ChakraImage
          loading={'eager'}
          srcSet={`${Image?.formats.small.url} 1x,
            ${Image?.formats.medium.url} 1.5x,
            ${Image?.formats.large.url} 2x`}
          maxWidth={'100%'}
          width={800}
        />
        <Flex
          maxWidth={800}
          width={'100%'}
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Heading>{Title}</Heading>
          <Moment format="MMM Do, YYYY">{Date}</Moment>
        </Flex>
        <Box>
          <Box maxWidth={800} mt={10}>
            <ReactMarkdown source={Text ?? undefined} />
          </Box>
        </Box>
      </Container>
    </Fragment>
  )
}

export default Article
