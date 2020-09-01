/**
 * @author Razvan Rauta
 * 30.08.2020
 * 02:53
 */

import React, { FunctionComponent } from 'react'
import {
  ArticleDocument,
  Maybe,
  NewsPosts,
  NewsPostsDocument,
  UploadFile,
} from '@/generated/graphql'
import { initializeApollo } from '@/utils/apollo'
import Article from '@/components/Article/Article'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

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
  error?: any
  loading?: boolean
}

type Props = OwnProps

const ArticlePage: FunctionComponent<Props> = ({
  newsPosts,
  error,
  loading,
}) => {
  const router = useRouter()

  if (loading || router.isFallback) return <p>Loading</p>

  if (error) {
    console.log(error)
    return <p>There was a error</p>
  }

  return <Article {...newsPosts?.[0]} />
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

  const { data, error, loading } = await apolloClient.query({
    query: ArticleDocument,
    variables: allArticleVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      newsPosts: data?.newsPosts,
      error: error ?? null,
      loading,
    },
    revalidate: 1,
  }
}

export default ArticlePage
