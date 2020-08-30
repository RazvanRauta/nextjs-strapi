/**
 * @author Razvan Rauta
 * 21/04/2020
 * 19:52
 */
const path = require('path')
require('dotenv').config()

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    ROOT_URL: process.env.ROOT_URL,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })
    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
}
