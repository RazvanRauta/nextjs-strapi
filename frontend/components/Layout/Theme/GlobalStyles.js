/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 20:13
 */
import React from 'react'
import { Global, css } from '@emotion/core'
import { rem } from 'polished'

const GlobalStyles = ({ styles }) => (
  <>
    <Global
      styles={css`
        ${styles}
        body {
          font-family: 'Open Sans', sans-serif;
        }
        .container {
          max-width: ${rem(1380)};
          width: 100%;
          margin: 0 auto;
        }
      `}
    />
  </>
)
export default GlobalStyles
