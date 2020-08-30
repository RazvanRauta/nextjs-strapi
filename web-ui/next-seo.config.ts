/**
 * @author Razvan Rauta
 * 21.08.2020
 * 19:16
 */

import { NextSeoProps } from 'next-seo'

export const SEO: NextSeoProps = {
  title: 'My Page',
  description: 'Solution Company',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'http://localhost:3000',
    site_name: 'My Page',
    images: [
      {
        url: 'http://localhost:3000/meta/meta-image.png',
        width: 1600,
        height: 1174,
        alt: 'Image',
      },
    ],
  },
  twitter: {
    handle: '@razvan',
    site: '@razvan',
    cardType: 'summary_large_image',
  },
}
