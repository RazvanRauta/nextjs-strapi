/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 01:55
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { jsonLdScriptProps } from 'react-schemaorg';
import { Article, WebPage } from 'schema-dts';

const defaultMeta = {
  title: 'NextJs with Strapi',
  siteName: 'NextJs with Strapi',
  description: 'A wonderful website',
  url: 'https://nextjs.rrazvan.dev',
  image: 'https://nextjs.rrazvan.dev/meta/meta-image.png',
  type: 'website',
  robots: 'follow, index',
  author: 'RRazvan',
};

type SeoProps = {
  date?: string | null;
  templateTitle?: string;
  author?: string | null;
  isArticle?: boolean;
  articleBody?: string | null;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  const jsonLtdWebPage = jsonLdScriptProps<WebPage>({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${meta.url}${router.asPath}`,
    description: meta.description,
    name: props.templateTitle,
    publisher: {
      '@type': 'Organization',
      name: 'RRazvan.dev',
      logo: {
        '@type': 'ImageObject',
        url: `${meta.url}/favicon/apple-icon-180x180.png`,
      },
    },
  });

  const jsonLtdArticle = jsonLdScriptProps<Article>({
    '@context': 'https://schema.org',
    '@type': 'Article',
    url: `${meta.url}${router.asPath}`,
    datePublished: meta.date || new Date().toISOString(),
    dateModified: meta.date || new Date().toISOString(),
    dateCreated: meta.date || new Date().toISOString(),
    description: meta.description,
    headline: meta.title,
    image: {
      '@type': 'ImageObject',
      url: meta.image,
    },
    author: {
      '@type': 'Person',
      name: meta.author,
      url: 'https://rrazvan.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RRazvan.dev',
      logo: {
        '@type': 'ImageObject',
        url: `${meta.url}/favicon/apple-icon-180x180.png`,
      },
    },
    articleBody: meta.articleBody || '',
  });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@th_clarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta name='author' property='article:author' content={meta.author} />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />
      {meta.isArticle ? (
        <script {...jsonLtdArticle} />
      ) : (
        <script {...jsonLtdWebPage} />
      )}
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
];
