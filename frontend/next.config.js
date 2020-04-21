/**
 * @author Razvan Rauta
 * 21/04/2020
 * 19:52
 */
const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['public'] = path.join(__dirname, 'public')

    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
}
