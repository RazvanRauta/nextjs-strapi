/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 02:09
 */

import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { graphQLClient } from '@/lib/graphql-client';

import Layout from '@/components/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { useNewsPostsQuery } from '@/generated';

export default function IndexPage() {
  const { data } = useNewsPostsQuery(graphQLClient, {
    start: 0,
    limit: 10,
  });
  return (
    <Layout>
      <Seo templateTitle='Welcome' />

      <main>
        <section className=''>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            {data &&
              data.newsPosts?.data.map((post) => (
                <article key={post.id} className='prose lg:prose-xl'>
                  <h1>{post.attributes?.title}</h1>
                  <NextImage
                    useSkeleton
                    className='w-80 h-80'
                    src={
                      post.attributes?.image.data?.attributes?.formats?.medium
                        ?.url || ''
                    }
                    width={
                      post.attributes?.image.data?.attributes?.formats?.medium
                        ?.width || ''
                    }
                    height={
                      post.attributes?.image.data?.attributes?.formats?.medium
                        ?.height || ''
                    }
                    alt={post.attributes?.title || ''}
                  />
                </article>
              ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useNewsPostsQuery.getKey({ limit: 10, start: 0 }),
    () => useNewsPostsQuery.fetcher(graphQLClient, { limit: 10, start: 0 })(),
    {
      staleTime: Infinity,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
