/**
 * @author Razvan Rauta
 * 21/04/2020
 * 19:52
 */
const path = require('path')
const svgToMiniDataURI = require('mini-svg-data-uri')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
require('dotenv').config()

module.exports = withPWA({
  env: {
    API_URL: process.env.API_URL,
    ROOT_URL: process.env.ROOT_URL,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })
    config.module.rules.push({
      test: /.svg$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            generator: (content) => svgToMiniDataURI(content.toString()),
          },
        },
      ],
    })
    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
})
