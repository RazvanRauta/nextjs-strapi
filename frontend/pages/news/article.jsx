/*
 * @author: Razvan Rauta
 * Date: 25.04.2020
 * Time: 17:09
 */

import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Moment from 'react-moment'
import { Flex } from 'reflexbox'
import ReactMarkdown from 'react-markdown'
import { rem } from 'polished'
import { useRouter } from 'next/router'
import ARTICLE_QUERY from 'apollo/queries/article/article'
import Query from 'components/GraphQL/Query'
import { NextSeo } from 'next-seo'

const Article = () => {
  const router = useRouter()
  return (
    <Query query={ARTICLE_QUERY} id={router.query.id}>
      {({
        data: {
          newsPosts: [{ Title, Image, Date, Text }],
        },
      }) => {
        const SEO = {
          title: Title,
          description: `${Text.substring(0, 300)}...`,
          openGraph: {
            title: Title,
            description: `${Text.substring(0, 300)}...`,
            images: [
              {
                url: `${process.env.API_URL + Image.formats.small.url}`,
                width: Image.width,
                height: Image.height,
                alt: Title,
              },
            ],
          },
        }
        return (
          <Fragment>
            <NextSeo {...SEO} />
            <NewsPostStyled>
              <div className="container news-post">
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                  <div className="title-container">
                    <Link href="/news">
                      <a>Back to all news</a>
                    </Link>
                    <div className="title">{Title}</div>
                    <Moment className="date" format="MMM Do, YYYY">
                      {Date}
                    </Moment>
                  </div>
                  <div className="post-body">
                    <div
                      className="featured-image"
                      data-src={`${process.env.API_URL + Image.formats.small.url}`}
                      data-srcset={`${process.env.API_URL + Image.formats.small.url}`}
                      width={Image.width}
                      height={Image.height}
                      alt={Title}
                      title={Title}
                      data-uk-img
                    />
                    <div className="content">
                      <ReactMarkdown source={Text} />
                    </div>
                  </div>
                </Flex>
              </div>
            </NewsPostStyled>
          </Fragment>
        )
      }}
    </Query>
  )
}

const NewsPostStyled = styled.div`
  background: ${(props) => props.theme.colors.backgrounds.primary};
  width: 100%;
  height: 100%;
  .news-post {
    max-width: ${rem(800)};
    background: ${(props) => props.theme.colors.backgrounds.white};
    padding: ${rem(30)};
  }
  .post-body {
    & .featured-image {
      object-fit: cover;
      background-size: cover;
      background-repeat: no-repeat;
      max-width: ${rem(650)};
      width: 100%;
      height: ${rem(300)};
      margin: ${rem(20)} auto;
    }

    & .content {
      max-width: ${rem(650)};
      width: 100%;
    }
  }
`

export default Article
