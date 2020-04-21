/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 20:13
 */
import React from 'react'
import { Global, css } from '@emotion/core'

const GlobalStyles = ({ styles }) => (
  <>
    <Global
      styles={css`
        ${styles}
        body {
          font-family: 'Open Sans', sans-serif;
        }
      `}
    />
  </>
)
export default GlobalStyles
