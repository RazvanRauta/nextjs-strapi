/*
 * @author: Razvan Rauta
 * Date: 22/04/2020
 * Time: 20:06
 */

import React from 'react'
import styled from '@emotion/styled'
import { rem } from 'polished'
import NEWS_POSTS_QUERY from 'apollo/queries/news-posts/news-posts'
import theme from 'components/Layout/Theme/Theme'
import Query from 'components/GraphQL/Query'
import NewsCard from 'components/News/NewsCard/NewsCard'

const Index = () => {
  return (
    <NewsStyled>
      <div className="container news">
        <Query query={NEWS_POSTS_QUERY}>
          {({ data: { newsPosts } }) => {
            return newsPosts.map((post) => <NewsCard newsPost={post} key={post.id} />)
          }}
        </Query>
      </div>
    </NewsStyled>
  )
}

const { mq } = theme

const NewsStyled = styled.div`
  background: ${(props) => props.theme.colors.backgrounds.primary};
  width: 100%;
  height: 100%;
  .news {
    display: grid;
    grid-row-gap: ${rem(30)};
    grid-column-gap: ${rem(30)};
    max-width: ${rem(1185)};
    margin: ${rem(40)} auto;
    padding: ${rem(30)};
    ${mq('small')} {
      grid-template-columns: 1fr 1fr 1fr;
    }
    ${mq('tablet') + ' and (max-width: 1280px)'} {
      grid-template-columns: 1fr 1fr;
      max-width: 770px;
    }
    ${mq('mobile') + ' and (max-width: 850px)'} {
      grid-template-columns: 1fr;
      max-width: 90%;
    }
  }
`

export default Index
