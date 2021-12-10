/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  images: {
    domains: ['strapi-admin-uploads.s3.eu-west-3.amazonaws.com'],
  },
};
