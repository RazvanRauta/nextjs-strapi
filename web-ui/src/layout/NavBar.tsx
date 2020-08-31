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

interface OwnProps {}

type Props = OwnProps

const NavBar: FunctionComponent<Props> = (props) => {
  return (
    <header>
      <Flex py={4} justifyContent="space-between" alignItems="center" mb={8}>
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
              <Link href="/udemy" fontWeight="bold">
                Udemy CSS Course
              </Link>
              <Link href="/register" fontWeight="bold">
                Some Register Page
              </Link>
            </HStack>
          </nav>
        </Flex>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </header>
  )
}

export default NavBar
