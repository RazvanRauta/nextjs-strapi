/*
 * @author: Razvan Rauta
 * Date: 22/04/2020
 * Time: 20:31
 */

import React from 'react'
import Moment from 'react-moment'
import styled from '@emotion/styled'
import { rem } from 'polished'
import theme from '../Layout/Theme/Theme'

const NewsPost = ({ newsPost }) => (
  <CardStyled>
    <a className="post-preview" href="/">
      <div className="picture">
        <img
          src={`${process.env.API_URL + newsPost.Image.formats.small.url}`}
          className="featured-image"
          alt={newsPost.Title}
          title={newsPost.Title}
        />
      </div>
      <div className="post-title-container">
        <span className="post-meta">
          <Moment format="MMM Do, YYYY">{newsPost.Date}</Moment>
        </span>
        <h3 className="title">{newsPost.Title}</h3>
      </div>
    </a>
  </CardStyled>
)

const CardStyled = styled.div`
  max-width: ${rem(370)};
  max-height: ${rem(400)};
  position: relative;
  background: ${(props) => props.theme.colors.backgrounds.white};
  border: ${rem(2)} solid ${(props) => props.theme.colors.backgrounds.white};
  display: flex;
  justify-self: center;

  .post-preview {
    padding: ${rem(30)};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: column nowrap;
    text-decoration: none;
  }
  img {
    width: ${rem(310)};
    height: ${rem(151)};
    object-fit: cover;
    box-shadow: 0 ${rem(3)} ${rem(3)} rgba(0, 0, 0, 0.3);
  }
  .post-title-container {
    width: 100%;
    height: 100%;
    margin-top: ${rem(10)};
  }
  .post-meta {
    color: #95a5a6;
    font-family: 'Open Sans', sans-serif;
    font-size: ${rem(15)};
    letter-spacing: 0;
    line-height: ${rem(25)};
  }
  .title {
    color: ${(props) => props.theme.colors.text.primary};
    font-family: 'Open Sans', sans-serif;
    font-size: ${rem(18)};
    font-weight: 700;
    letter-spacing: 0;
    line-height: ${rem(28)};
    margin: 0 0 ${rem(16)};
  }
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.text.secondary};
    .title {
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }
`

export default NewsPost
