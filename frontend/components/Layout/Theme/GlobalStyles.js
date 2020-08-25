/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 20:13
 */
import React from 'react'
import { Global, css } from '@emotion/core'
import { normalize, rem } from 'polished'

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        ${normalize()}
        *,*::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Open Sans', sans-serif;
          box-sizing: border-box;
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
