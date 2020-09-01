/**
 * @author Razvan Rauta
 * 30.08.2020
 * 02:53
 */

import React, { FunctionComponent } from 'react'
import {
  ArticleDocument,
  NewsPosts,
  NewsPostsDocument,
} from '@/generated/graphql'
import { initializeApollo } from '@/utils/apollo'
import Article from '@/components/Article/Article'
import { GetStaticPaths, GetStaticProps } from 'next'

interface OwnProps {}

type Props = OwnProps

const ArticlePage: FunctionComponent<Props> = () => {
  return <Article />
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
    paths: newsPosts.map(({ Slug }: NewsPosts) => ({
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
    },
    revalidate: 1,
  }
}

export default ArticlePage
