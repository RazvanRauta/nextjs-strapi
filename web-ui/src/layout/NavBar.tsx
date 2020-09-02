/**
 * @author Razvan Rauta
 * 30.08.2020
 * 20:33
 */
import React, { FunctionComponent } from 'react'
import { Flex, Heading, HStack } from '@chakra-ui/core'
import { Link } from '@/layout/NextLink'
import { Logo } from '@/layout/Logo'
import { ColorModeSwitcher } from '@/layout/ColorModeSwitcher'
import Wrapper from '@/components/Wrapper/Wrapper'

interface OwnProps {}

type Props = OwnProps

const NavBar: FunctionComponent<Props> = () => {
  return (
    <header>
      <Wrapper variant="full">
        <Flex
          py={4}
          justifyContent="space-between"
          alignItems="center"
          maxWidth={1200}
          mx="auto"
          mb={8}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <nav>
              <HStack spacing={12}>
                <Link
                  href="/"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Logo h="2.5rem" pointerEvents="none" mr={4} />
                  <Heading size="lg">RRazvan</Heading>
                </Link>
                <Link href="/news" fontWeight="bold">
                  News
                </Link>
                <Link href="/register" fontWeight="bold">
                  Some Register Page
                </Link>
              </HStack>
            </nav>
          </Flex>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Wrapper>
    </header>
  )
}

export default NavBar
