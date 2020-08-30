/**
 * @author Razvan Rauta
 * 29.08.2020
 * 12:49
 */

import React, { FunctionComponent } from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Layout } from '@/components/Layout/Layout'

interface OwnProps {}

type Props = OwnProps

const Index: FunctionComponent<Props> = (props) => {
  return (
    <Layout title={'Index'}>
      <Wrapper variant={'large'}>
        <h1>Hello</h1>
      </Wrapper>
    </Layout>
  )
}
export default Index
