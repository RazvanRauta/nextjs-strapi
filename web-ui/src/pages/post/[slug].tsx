/**
 *  @author: Razvan Rauta
 *  Date: Dec 11 2021
 *  Time: 15:52
 */

import { ArrowLeftIcon } from '@heroicons/react/solid';
import { GetStaticPaths } from 'next';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

import { PublicationState, useArticleBySlugQuery } from '@/generated';
import {
  getNewsPosts,
  getPostBySlug,
  getRunningOperationPromises,
  makeStore,
  wrapper,
} from '@/store';

type PostPageProps = {
  preview: boolean | null;
};

export default function PostPage({ preview }: PostPageProps) {
  const router = useRouter();
  const slug = router.query?.slug;

  const getSlug = useCallback(
    () =>
      typeof slug === 'string'
        ? {
            slug,
            state: preview ? PublicationState.Preview : PublicationState.Live,
          }
        : {
            slug: '',
            state: preview ? PublicationState.Preview : PublicationState.Live,
          },
    [slug, preview]
  );

  const { data, error, isLoading } = useArticleBySlugQuery(getSlug());

  if (error) return <Error statusCode={500} />;

  if (isLoading || router.isFallback)
    return (
      <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <div className='w-20 h-20 rounded-full border-t-4 border-b-4 border-green-900 animate-spin'></div>
        <p className='mt-4'>Loading...</p>
      </div>
    );

  if (!data?.newsPosts?.data?.[0])
    return <Error statusCode={401} title='Post was not found' />;

  return (
    <Layout preview={preview}>
      <Seo
        templateTitle={data?.newsPosts?.data?.[0]?.attributes?.title || 'Post'}
        image={
          data?.newsPosts?.data?.[0]?.attributes?.image.data?.attributes
            ?.formats?.medium.url
        }
      />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            <Link href={`/`}>
              <a className='no-underline' title='Home'>
                <ArrowLeftIcon className='w-10 h-10 hover:scale-x-125' />
              </a>
            </Link>
            <article className='prose lg:prose-xl'>
              <h1>{data?.newsPosts?.data?.[0]?.attributes?.title}</h1>

              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ref, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const _notUsed = { node, ref };
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={theme}
                        language={match[1]}
                        PreTag='div'
                        {...props}
                      >
                        {String(children).replace(/\n$/, '') || ''}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {data?.newsPosts?.data?.[0]?.attributes?.text || ''}
              </ReactMarkdown>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const store = makeStore();
  const result = await store.dispatch(
    getNewsPosts.initiate({ start: 0, limit: 10000 })
  );

  if (result?.data?.newsPosts?.data) {
    return {
      paths: result.data?.newsPosts?.data.map((p) => ({
        params: { slug: p.attributes?.slug || '' },
      })),
      fallback: true,
    };
  }

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params, preview = null }) => {
      const slug = params?.slug;
      if (typeof slug === 'string') {
        store.dispatch(
          getPostBySlug.initiate({
            slug,
            state: preview ? PublicationState.Preview : PublicationState.Live,
          })
        );
      }

      await Promise.all(getRunningOperationPromises());

      return {
        props: { preview },
      };
    }
);
