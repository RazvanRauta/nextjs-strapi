/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 23:14
 */

import {
  ArticleBySlugQuery,
  NewsPostEntity,
  NewsPostsQuery,
} from '@/generated';

import { ImageFormats, ParsedPost } from '@/types';

export function parsePost({ id, attributes }: NewsPostEntity): ParsedPost {
  const image: ImageFormats = {
    large: attributes?.image.data?.attributes?.formats['large'] || null,
    medium: attributes?.image.data?.attributes?.formats['large'] || null,
    small: attributes?.image.data?.attributes?.formats['large'] || null,
    thumbnail: attributes?.image.data?.attributes?.formats['large'] || null,
  };

  return {
    id: id || null,
    date: attributes?.date || null,
    slug: attributes?.slug || null,
    title: attributes?.slug || null,
    text: attributes?.text || null,
    image,
  };
}

export function parsePosts(
  posts: ArticleBySlugQuery | NewsPostsQuery | undefined
): ParsedPost[] {
  if (posts?.newsPosts?.data && posts?.newsPosts?.data.length) {
    const postsData = posts?.newsPosts?.data as Array<NewsPostEntity>;
    return postsData.map((post) => parsePost(post));
  }

  return [];
}
