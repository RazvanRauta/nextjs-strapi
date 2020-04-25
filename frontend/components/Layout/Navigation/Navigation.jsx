/*
 * @author: Razvan Rauta
 * Date: 24/04/2020
 * Time: 21:39
 */

import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { rem } from 'polished'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()

  return (
    <NavigationStyled>
      <ul>
        <li>
          <Link href="/about">
            <a className={router.pathname === '/about' ? 'active' : ''}>About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className={router.pathname === '/contact' ? 'active' : ''}>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/news">
            <a className={router.pathname === '/news' ? 'active' : ''}>News</a>
          </Link>
        </li>
      </ul>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    list-style: none;

    li {
      margin-left: ${rem(20)};
      a {
        color: ${(props) => props.theme.colors.text.primary};
        font-size: ${rem(15)};
        font-weight: ${(props) => props.theme.fonts.fontWeight.six};

        letter-spacing: 0;
        line-height: ${rem(20)};
        text-decoration: none;
        text-transform: uppercase;
        &.active {
          font-weight: ${(props) => props.theme.fonts.fontWeight.seven};
          color: #172031;
        }
      }
      &:hover {
        a {
          color: #172031;
        }
      }
    }
  }
`

export default Navigation
