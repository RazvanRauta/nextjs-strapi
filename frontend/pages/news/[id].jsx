/*
 * @author: Razvan Rauta
 * Date: 25.04.2020
 * Time: 17:09
 */

import React from 'react'
import fetch from 'next'
import styled from '@emotion/styled'
import Link from 'next/link'
import Moment from 'react-moment'
import { Flex } from 'reflexbox'
import ReactMarkdown from 'react-markdown'
import { rem } from 'polished'

const NewsPost = ({ newsPost: { Title, Image, Date, Text } }) => (
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
          <img
            className="featured-image"
            src={`${process.env.API_URL + Image.formats.small.url}`}
            width={Image.width}
            height={Image.height}
            alt={Title}
            title={Title}
          />
          <div className="content">
            <ReactMarkdown source={Text} />
          </div>
        </div>
      </Flex>
    </div>
  </NewsPostStyled>
)

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

export async function getServerSideProps(context) {
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/news-posts/${context.query.id}`)
  const data = await res.json()
  return {
    props: {
      newsPost: data,
    },
  }
}

export default NewsPost
