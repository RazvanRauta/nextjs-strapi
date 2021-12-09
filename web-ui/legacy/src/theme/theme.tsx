import theme, { Theme } from '@chakra-ui/theme'
import { merge } from '@chakra-ui/utils'

// 2. Extend the theme to include custom colors, fonts, etc.
const webUiTheme: Theme = merge(theme, {
  colors: {
    primary: '#56646F',
    secondary: '#2E83B9',
    white: '#fff',
  },
  breakpoints: ['30em', '48em', '62em', '80em'],
})

export default webUiTheme
