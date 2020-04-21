/**
 * @author Razvan Rauta
 * 21/04/2020
 * 19:22
 */

import React from 'react'
import Header from '../components/Layout/Header/Header'
import { ThemeProvider } from 'emotion-theming'
import theme from '../components/Layout/Theme/Theme'
import normalize from 'normalize.css'
import GlobalStyles from '../components/Layout/Theme/GlobalStyles'

function KlikaTech({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={normalize} />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default KlikaTech
