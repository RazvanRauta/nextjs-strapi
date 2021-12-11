/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 02:09
 */

import Link from 'next/link';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import Layout from '@/components/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { useNewsPostsQuery } from '@/generated';
import { getNewsPosts, getRunningOperationPromises, wrapper } from '@/store';

type IndexPageProps = {
  preview: boolean | null;
};

export default function IndexPage({ preview }: IndexPageProps): ReactElement {
  const { data } = useNewsPostsQuery({ limit: 10, start: 0 });
  return (
    <Layout preview={preview}>
      <Seo templateTitle='Welcome' />

      <main>
        <section className=''>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            {data &&
              data.newsPosts?.data.map((post) => (
                <article key={post.id} className='prose lg:prose-xl'>
                  <Link prefetch href={`post/${post.attributes?.slug}`}>
                    <a className='no-underline'>
                      <h1>{post.attributes?.title}</h1>
                    </a>
                  </Link>
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
