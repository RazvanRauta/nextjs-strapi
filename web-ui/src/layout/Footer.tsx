/**
 * @author Razvan Rauta
 * 30.08.2020
 * 20:35
 */
import React, { FunctionComponent } from 'react'
import { Flex, Grid } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import Wrapper from '@/components/Wrapper/Wrapper'

interface OwnProps {}

type Props = OwnProps

const Footer: FunctionComponent<Props> = () => {
  return (
    <StyledFooter>
      <Wrapper variant={'large'}>
        <Grid templateColumns={'repeat(3,1fr)'}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            Stanga
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            Centru
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            Dreapta
          </Flex>
        </Grid>
      </Wrapper>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  padding: 4.8rem;
  width: 100%;
`

export default Footer
