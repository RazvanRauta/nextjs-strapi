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
import styled from '@emotion/styled'

interface OwnProps {}

type Props = OwnProps

const Register: FunctionComponent<Props> = () => {
  return (
    <Wrapper
      variant="small"
      height={'calc(100vh - 72px - 177px)'}
      justifyContent="center"
      display="flex"
      width="400px"
    >
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ isSubmitting }) => (
          <StyledForm>
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
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  )
}
const StyledForm = styled(Form)`
  margin: auto;
  width: 100%;
`

export default Register
