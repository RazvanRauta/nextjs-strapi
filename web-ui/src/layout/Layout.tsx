/**
 * @author Razvan Rauta
 * 29.08.2020
 * 23:53
 */

import React, { ReactNode } from 'react'
import Head from 'next/head'
import Wrapper from '@/components/Wrapper/Wrapper'
import NavBar from '@/layout/NavBar'
import Footer from '@/layout/Footer'
import styled from '@emotion/styled'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <StyledDiv>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#317EFB" />
      <title>{title}</title>
    </Head>
    <Wrapper variant="full">
      <NavBar />
      {children}
    </Wrapper>
    <Footer />
  </StyledDiv>
)

const StyledDiv = styled.div`
  position: relative;
`
