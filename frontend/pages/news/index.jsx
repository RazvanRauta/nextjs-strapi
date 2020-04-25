/*
 * @author: Razvan Rauta
 * Date: 22/04/2020
 * Time: 20:06
 */

import React from 'react'
import fetch from 'isomorphic-unfetch'
import styled from '@emotion/styled'
import { rem } from 'polished'
import NewsPost from '../../components/News/NewsPost'
import theme from '../../components/Layout/Theme/Theme'

const Index = ({ news_posts }) => {
  return (
    <NewsStyled>
      <div className="container news">
        {news_posts.map((post) => (
          <NewsPost newsPost={post} key={post.id} />
        ))}
      </div>
    </NewsStyled>
  )
}

export async function getServerSideProps() {
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/news-posts`)
  const data = await res.json()
  return {
    props: {
      news_posts: data,
    },
  }
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
