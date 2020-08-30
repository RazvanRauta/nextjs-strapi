/**
 * @author Razvan Rauta
 * 29.08.2020
 * 23:53
 */

import { ReactNode } from 'react'
import Head from 'next/head'
import { Container, Flex, Heading, HStack } from '@chakra-ui/core'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import { Link } from './NextLink'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
    </Head>
    <Container maxWidth="1200px">
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
                  <Logo h="1.5rem" pointerEvents="none" mr={4} />
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
      {children}
    </Container>
  </div>
)
