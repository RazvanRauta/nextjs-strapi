/*
 * @author: Razvan Rauta
 * Date: 21/04/2020
 * Time: 20:13
 */

const breakpoints = {
  mobile: 360,
  tablet: 768,
  iPad: 1024,
  small: 1280,
  medium: 1366,
  large: 1440,
  xl: 1536,
}

const mq = (n) => `@media screen and (min-width: ${breakpoints[n]}px)`

export default {
  colors: {
    text: {
      primary: '#56646F',
      secondary: '#2E83B9',
      white: '#ffffff',
    },
    backgrounds: {
      primary: 'rgba(242,245,248,.65)',
      footer: '#23282F',
      header: '#01538B',
      white: '#ffffff',
    },
    borders: {
      active: '#172031',
      static: '#e8edf3',
      highlighted: '#2E83B9',
    },
  },
  fonts: {
    fontWeight: {
      seven: '700',
      six: '600',
      normal: 'normal',
    },
    fontStyle: {
      primary: `'Open Sans, sans-serif'`,
    },
  },
  mq,
}
