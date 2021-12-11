/**
 *  @author: Razvan Rauta
 *  Date: Dec 11 2021
 *  Time: 15:52
 */

import { GetStaticPaths } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

import { useArticleBySlugQuery } from '@/generated';
import {
  getNewsPosts,
  getPostBySlug,
  getRunningOperationPromises,
  makeStore,
  wrapper,
} from '@/store';

export default function PostPage() {
  const router = useRouter();
  const slug = router.query?.slug;
  const getSlug = useCallback(
    () => (typeof slug === 'string' ? { slug } : { slug: '' }),
    [slug]
  );

  const { data, error, isLoading } = useArticleBySlugQuery(getSlug());

  if (error) return <Error statusCode={500} />;

  if (isLoading || router.isFallback) return <div>Loading</div>;

  return (
    <Layout>
      <Seo templateTitle='Post' />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            <article className='prose lg:prose-xl'>
              <h1>{data?.newsPosts?.data[0].attributes?.title}</h1>

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
                {data?.newsPosts?.data[0].attributes?.text || ''}
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
  (store) => async (context) => {
    const slug = context.params?.slug;
    if (typeof slug === 'string') {
      store.dispatch(getPostBySlug.initiate({ slug }));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
