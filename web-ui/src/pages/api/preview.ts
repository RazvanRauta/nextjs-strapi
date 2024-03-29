/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 19:32
 */

import consola from 'consola';
import { NextApiRequest, NextApiResponse } from 'next';

import { PublicationState } from '@/generated';
import { makeStore } from '@/store';
import { postsApiRequests } from '@/store/post/actions';

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let post;
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const store = makeStore();
  if (typeof req.query.slug === 'string') {
    try {
      post = await store.dispatch(
        postsApiRequests.VerifyIfPostExists.initiate({
          slug: req.query.slug,
          state: PublicationState.Preview,
        })
      );
    } catch (error) {
      consola.error(error);
    }
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (
    !post?.data?.posts?.data?.[0]?.attributes?.slug ||
    post?.data?.posts?.data?.[0]?.attributes?.slug !== req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: `/post/${post.data?.posts?.data[0].attributes?.slug}`,
  });
  res.end();
}
