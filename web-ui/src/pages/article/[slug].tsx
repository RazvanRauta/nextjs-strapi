/**
 * @author Razvan Rauta
 * 30.08.2020
 * 02:53
 */

import React, { FunctionComponent } from 'react'
import { ArticleDocument, NewsPostsDocument } from '@/generated/graphql'
import { initializeApollo } from '@/utils/apollo'
import { useQuery } from '@apollo/client'
import Article from '@/components/Article/Article'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

interface OwnProps {
  slug: string
}

type Props = OwnProps

const ArticlePage: FunctionComponent<Props> = ({ slug }) => {
  const { data, loading, error } = useQuery(ArticleDocument, {
    variables: { id: slug },
  })
  const router = useRouter()

  if (loading || router.isFallback) return <p>Loading</p>

  if (error) return <p>{error}</p>

  return <Article {...data?.newsPosts[0]} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { newsPosts },
    error,
  } = await apolloClient.query({
    query: NewsPostsDocument,
    variables: { limit: 100, start: 0 },
  })

  if (error) {
    console.log('Error while getStaticPaths, ', error)
  }

  return {
    // @ts-ignore
    paths: newsPosts.map(({ Slug }) => ({
      params: { slug: Slug },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo()
  const { params } = context
  // @ts-ignore
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

export default ArticlePage
