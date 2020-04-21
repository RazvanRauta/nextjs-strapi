/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 19:43
 */

import React from 'react'
import styled from '@emotion/styled'

const Header = () => <HeaderStyled>Now I am a real header</HeaderStyled>

const HeaderStyled = styled.header`
  background: ${(props) => props.theme.colors.backgrounds.white};
`

export default Header
