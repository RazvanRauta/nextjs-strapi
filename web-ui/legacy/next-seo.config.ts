/**
 * @author Razvan Rauta
 * 21.08.2020
 * 19:16
 */

import { NextSeoProps } from 'next-seo'

export const SEO: NextSeoProps = {
  title: 'NextJS | RRazvan',
  description: 'NextJS and Strapi App',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: process.env.ROOT_URL,
    site_name: 'NextJS | RRazvan',
    images: [
      {
        url: `${process.env.ROOT_URL}/meta/meta-image.png`,
        width: 1600,
        height: 1174,
        alt: 'Image',
      },
    ],
  },
  twitter: {
    handle: '@Razvan_Rauta',
    site: '@Razvan_Rauta',
    cardType: 'summary_large_image',
  },
}
