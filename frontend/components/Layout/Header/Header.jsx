/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 19:43
 */

import React from 'react'
import styled from '@emotion/styled'
import { rem } from 'polished'
import { Flex, Box } from 'reflexbox'
import Navigation from '../Navigation/Navigation'
import Link from 'next/link'

const Header = () => (
  <HeaderStyled>
    <Box variant="container">
      <Flex justifyContent="space-between" alignItems="center">
        <div className="logo-container">
          <Link href="/">
            <a>
              <img className="logo" src="/images/klika-tech-logo.svg" alt="Site logo" />
            </a>
          </Link>
        </div>
        <Navigation />
      </Flex>
    </Box>
  </HeaderStyled>
)

const HeaderStyled = styled.header`
  background: ${(props) => props.theme.colors.backgrounds.white};
  padding: ${rem(20)};
  max-width: ${rem(1380)};
  margin: 0 auto;
  .logo-container {
    display: flex;
    align-items: center;
    .logo {
      width: ${rem(262)};
      height: ${rem(48)};
    }
    .logo-text {
      color: ${(props) => props.theme.colors.text.primary};
      font-size: ${rem(20)};
    }
  }
`

export default Header
