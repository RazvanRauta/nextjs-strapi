import * as React from 'react';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            Hello
          </div>
        </section>
      </main>
    </Layout>
  );
}
