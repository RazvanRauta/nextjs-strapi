/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 02:09
 */

import Error from 'next/error';
import Link from 'next/link';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import useParsedNewsPosts from '@/hooks/parsedNewsPosts';

import Layout from '@/components/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { getNewsPosts, getRunningOperationPromises, wrapper } from '@/store';

type IndexPageProps = {
  preview: boolean | null;
};

export default function IndexPage({ preview }: IndexPageProps): ReactElement {
  const {
    data: { parsedNewsPosts },
    error,
    isLoading,
  } = useParsedNewsPosts({
    limit: 10,
    start: 0,
  });

  if (error) return <Error statusCode={500} />;

  if (isLoading)
    return (
      <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <div className='w-20 h-20 rounded-full border-t-4 border-b-4 border-green-900 animate-spin'></div>
        <p className='mt-4'>Loading...</p>
      </div>
    );

  return (
    <Layout preview={preview}>
      <Seo templateTitle='Welcome' />

      <main>
        <section className=''>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            {parsedNewsPosts &&
              parsedNewsPosts.length &&
              parsedNewsPosts.map((post) => (
                <section key={post.id} className='prose lg:prose-xl'>
                  <Link prefetch href={`post/${post.slug}`}>
                    <a className='no-underline'>
                      <h1>{post.title}</h1>
                    </a>
                  </Link>
                  {post.image?.medium && (
                    <NextImage
                      useSkeleton
                      sizes=''
                      className='relative max-w-md'
                      imgClassName='object-contain'
                      src={post.image.medium?.url || ''}
                      width={post.image.medium?.width || ''}
                      height={post.image.medium?.height || ''}
                      alt={post.title || ''}
                      priority
                    />
                  )}
                </section>
              ))}
            {!parsedNewsPosts?.length && (
              <div>
                <h2>No posts were found </h2>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview = null }) => {
      store.dispatch(getNewsPosts.initiate({ limit: 10, start: 0 }));

      await Promise.all(getRunningOperationPromises());

      return {
        props: { preview },
      };
    }
);
