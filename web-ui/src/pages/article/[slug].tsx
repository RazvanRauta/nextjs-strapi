/**
 * @author Razvan Rauta
 * 30.08.2020
 * 02:53
 */

import React, { FunctionComponent } from 'react'
import { ArticleDocument, NewsPostsDocument } from '../../generated/graphql'
import { initializeApollo } from '../../utils/apollo'
import { Box, Image as CoreImage } from '@chakra-ui/core'
import { useQuery } from '@apollo/client'

interface OwnProps {
  slug: string
}

type Props = OwnProps

const Article: FunctionComponent<Props> = ({ slug }) => {
  const { data, loading, error } = useQuery(ArticleDocument, {
    variables: { id: slug },
  })
  if (loading) return <p>Loading</p>

  if (error) return <p>{error}</p>

  const { Title, Image } = data?.newsPosts[0]

  return (
    <Box>
      <p>{Title}</p>
      <CoreImage
        loading={'lazy'}
        src={`${process.env.ROOT_URL + Image?.formats.small.url}`}
        srcSet={`${process.env.ROOT_URL + Image?.formats.small.url}`}
      />
    </Box>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const {
    data: { newsPosts },
    error,
    loading,
  } = await apolloClient.query({
    query: NewsPostsDocument,
    variables: { limit: 100, start: 0 },
  })

  if (error) {
    console.log('Error while getStaticPaths, ', error)
  }

  if (!loading) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paths: newsPosts.map(({ Slug }) => ({
        params: { slug: Slug },
      })),
      fallback: true,
    }
  }
}

export async function getStaticProps(context: any) {
  const apolloClient = initializeApollo()
  const { params } = context
  const { slug } = params

  const allArticleVars = {
    id: slug,
  }

  await apolloClient.query({
    query: ArticleDocument,
    variables: allArticleVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      slug,
    },
    revalidate: 1,
  }
}

export default Article
