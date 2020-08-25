/**
 * @author Razvan Rauta
 * 25.04.2020
 * 16:42
 */

import { gql } from '@apollo/client'

const NEWS_POSTS_QUERY = gql`
  query NewsPosts {
    newsPosts {
      id
      Slug
      Title
      Image {
        width
        height
        formats
      }
      Date
      Text
    }
  }
`

export default NEWS_POSTS_QUERY
