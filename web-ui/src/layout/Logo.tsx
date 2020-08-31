/**
 * @author Razvan Rauta
 * 29.08.2020
 * 23:54
 */

import React from 'react'
import { Image, keyframes, ImageProps } from '@chakra-ui/core'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = (props: ImageProps) => (
  <Image
    css={{
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${spin} infinite 20s linear`,
      },
    }}
    alt=""
    src={'/apple-touch-icon.png'}
    {...props}
  />
)
