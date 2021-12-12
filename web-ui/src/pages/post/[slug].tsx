/**
 *  @author: Razvan Rauta
 *  Date: Dec 11 2021
 *  Time: 15:52
 */

import { ArrowLeftIcon } from '@heroicons/react/solid';
import consola from 'consola';
import { GetStaticPaths } from 'next';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import useParsedArticle from '@/hooks/parsedPost';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

import { PublicationState } from '@/generated';
import { getRunningOperationPromises, makeStore, wrapper } from '@/store';
import { postsApiRequests } from '@/store/post/actions';

type PostPageProps = {
  preview: boolean | null;
};

export default function PostPage({ preview }: PostPageProps) {
  const router = useRouter();
  const slug = router.query?.slug;

  const { parsedPost, error, isLoading } = useParsedArticle({ preview, slug });

  if (error) {
    consola.error(error);
    return <Error statusCode={500} />;
  }

  if (isLoading || router.isFallback)
    return (
      <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <div className='w-20 h-20 rounded-full border-t-4 border-b-4 border-green-900 animate-spin'></div>
        <p className='mt-4'>Loading...</p>
      </div>
    );

  return (
    <Layout preview={preview}>
      <Seo
        templateTitle={parsedPost?.title || 'Post'}
        image={parsedPost?.cover?.medium?.url || ''}
        description={parsedPost?.excerpt || ''}
        author={parsedPost?.author?.name || ''}
        date={parsedPost?.date}
      />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            <Link href={`/`}>
              <a className='no-underline' title='Home'>
                <ArrowLeftIcon className='w-10 h-10 hover:scale-x-125' />
              </a>
            </Link>
            {parsedPost && (
              <article className='prose lg:prose-xl'>
                <h1>{parsedPost?.title}</h1>

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
                  {parsedPost?.content || ''}
                </ReactMarkdown>
              </article>
            )}
            {!parsedPost && (
              <div>
                <h2>Post not Found</h2>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const store = makeStore();
  try {
    const result = await store.dispatch(
      postsApiRequests.PostsWithSlug.initiate({ start: 0, limit: 10000 })
    );

    if (result?.data?.posts?.data) {
      return {
        paths: result.data?.posts?.data.map((p) => ({
          params: { slug: p.attributes?.slug },
        })),
        fallback: true,
      };
    }
  } catch (error) {
    consola.error(error);
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
      try {
        if (typeof slug === 'string') {
          store.dispatch(
            postsApiRequests.PostBySlug.initiate({
              slug,
              state: preview ? PublicationState.Preview : PublicationState.Live,
            })
          );
        }

        await Promise.all(getRunningOperationPromises());
      } catch (error) {
        consola.error(error);
      }

      return {
        props: { preview },
      };
    }
);
