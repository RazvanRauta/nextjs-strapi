/**
 * @author Razvan Rauta
 * 29.08.2020
 * 13:44
 */

import React, { FunctionComponent } from 'react'
import { Box, PropsOf } from '@chakra-ui/core'

interface OwnProps extends PropsOf<typeof Box> {
  variant?: 'xSmall' | 'small' | 'medium' | 'large' | 'full'
}

const getSize = {
  xSmall: 300,
  small: 600,
  medium: 800,
  large: 1200,
  full: '100%',
}

type Props = OwnProps

const Wrapper: FunctionComponent<Props> = ({
  children,
  variant = 'large',
  ...chakraProps
}) => {
  return (
    <Box
      marginX={'auto'}
      maxWidth={getSize[variant]}
      width={'100%'}
      {...chakraProps}
    >
      {children}
    </Box>
  )
}

export default Wrapper
