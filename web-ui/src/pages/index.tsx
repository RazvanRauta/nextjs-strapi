/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 02:09
 */

import consola from 'consola';
import Error from 'next/error';
import Link from 'next/link';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import { parsePosts } from '@/lib/parser';

import Layout from '@/components/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { usePostsPaginatedQuery } from '@/generated';
import { getRunningOperationPromises, wrapper } from '@/store';
import { postsApiRequests } from '@/store/post/actions';

type IndexPageProps = {
  preview: boolean | null;
};

export default function IndexPage({ preview }: IndexPageProps): ReactElement {
  const { data, error, isLoading, isError } = usePostsPaginatedQuery({
    limit: 10,
    start: 0,
  });

  if (isError) {
    consola.error(error || 'Unknown error');
    return <Error statusCode={500} />;
  }

  if (isLoading)
    return (
      <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <div className='w-20 h-20 rounded-full border-t-4 border-b-4 border-green-900 animate-spin'></div>
        <p className='mt-4'>Loading...</p>
      </div>
    );

  const parsedPosts = parsePosts(data);

  return (
    <Layout preview={preview}>
      <Seo templateTitle='Welcome' />

      <main className='p-3'>
        <section className=''>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            {parsedPosts && parsedPosts.length
              ? parsedPosts.map((post) => (
                  <section
                    key={post.id}
                    className='prose md:prose-xl dark:md:prose-xl-dark dark:prose-dark'
                  >
                    <Link prefetch href={`post/${post.slug}`}>
                      <a className='no-underline'>
                        <h1>{post.title}</h1>
                      </a>
                    </Link>
                    {post.cover?.medium && (
                      <NextImage
                        useSkeleton
                        sizes=''
                        className='relative max-w-md'
                        imgClassName='object-contain'
                        src={post.cover.medium?.url || ''}
                        width={post.cover.medium?.width || ''}
                        height={post.cover.medium?.height || ''}
                        alt={post.title || ''}
                        priority
                      />
                    )}
                    {post.excerpt && <p>{post.excerpt}</p>}
                    {post.author && (
                      <div>
                        <p>Written By: {post.author.name}</p>
                        {post.author.avatar && (
                          <NextImage
                            src={post.author.avatar.thumbnail?.url || ''}
                            width={150}
                            height={150}
                            alt='Author'
                          />
                        )}
                      </div>
                    )}
                  </section>
                ))
              : null}
            {!parsedPosts?.length ? (
              <div>
                <h2>No posts were found </h2>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview = null }) => {
      try {
        store.dispatch(
          postsApiRequests.PostsPaginated.initiate({ limit: 10, start: 0 })
        );

        await Promise.all(getRunningOperationPromises());
      } catch (error) {
        consola.error(error);
      }

      return {
        props: { preview },
      };
    }
);
