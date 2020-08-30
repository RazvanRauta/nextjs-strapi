/**
 * @author Razvan Rauta
 * 29.08.2020
 * 14:05
 */

import React, { FunctionComponent, InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/core'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

const InputFiled: FunctionComponent<Props> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default InputFiled
