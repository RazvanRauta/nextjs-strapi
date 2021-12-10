/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 02:09
 */

import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { graphQLClient } from '@/lib/graphql-client';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

import { useNewsPostsQuery } from '@/generated';

export default function NewsPage() {
  const { data } = useNewsPostsQuery(graphQLClient, {
    start: 0,
    limit: 10,
  });
  return (
    <Layout>
      <Seo templateTitle='News' />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            {data &&
              data.newsPosts?.data.map((post) => (
                <h1 key={post.id}>{post.attributes?.title}</h1>
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
