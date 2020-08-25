/**
 * @author Razvan Rauta
 * 25.04.2020
 * 18:57
 */

import { gql } from '@apollo/client'

const ARTICLE_QUERY = gql`
  query NewsPosts($id: String!) {
    newsPosts(where: { Slug: $id }) {
      id
      Title
      Slug
      Text
      Image {
        formats
        width
        height
      }
      Date
    }
  }
`

export default ARTICLE_QUERY
