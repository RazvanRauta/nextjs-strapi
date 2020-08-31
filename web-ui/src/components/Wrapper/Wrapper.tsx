/**
 * @author Razvan Rauta
 * 29.08.2020
 * 13:44
 */

import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/core'

interface OwnProps {
  variant?: 'xSmall' | 'small' | 'medium' | 'large'
}

const getSize = {
  xSmall: 300,
  small: 600,
  medium: 800,
  large: 1200,
}

type Props = OwnProps

const Wrapper: FunctionComponent<Props> = ({ children, variant = 'large' }) => {
  return (
    <Box mt={8} marginX={'auto'} maxWidth={getSize[variant]} width={'100%'}>
      {children}
    </Box>
  )
}

export default Wrapper
