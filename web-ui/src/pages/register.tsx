/**
 * @author Razvan Rauta
 * 29.08.2020
 * 14:16
 */
import React, { FunctionComponent } from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Form, Formik } from 'formik'
import InputFiled from '@/components/InputField/InputFiled'
import { Box, Button } from '@chakra-ui/core'
import { Layout } from '@/components/Layout/Layout'

interface OwnProps {}

type Props = OwnProps

const Register: FunctionComponent<Props> = (props) => {
  return (
    <Layout title={'Register'}>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box marginTop={2}>
                <InputFiled
                  label={'Username'}
                  name={'username'}
                  placeholder={'username'}
                  type={'text'}
                />
              </Box>
              <Box marginTop={4}>
                <InputFiled
                  label={'Password'}
                  name={'password'}
                  placeholder={'password'}
                  type={'password'}
                />
              </Box>
              <Box marginTop={6}>
                <Button
                  type={'submit'}
                  variant={'outline'}
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  )
}

export default Register
