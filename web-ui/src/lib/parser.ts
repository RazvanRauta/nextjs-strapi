/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 23:14
 */

import { PostBySlugQuery, PostEntity, PostsPaginatedQuery } from '@/generated';

import { ImageFormats, ParsedPost } from '@/types';

export function parsePost({ id, attributes }: PostEntity): ParsedPost {
  const cover: ImageFormats = {
    large: attributes?.cover.data?.attributes?.formats['large'] || null,
    medium: attributes?.cover.data?.attributes?.formats['medium'] || null,
    small: attributes?.cover.data?.attributes?.formats['small'] || null,
    thumbnail: attributes?.cover.data?.attributes?.formats['thumbnail'] || null,
  };

  const avatar: ImageFormats = {
    large:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'large'
      ] || null,
    medium:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'medium'
      ] || null,
    small:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'small'
      ] || null,
    thumbnail:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'thumbnail'
      ] || null,
  };

  return {
    id: id || null,
    date: attributes?.date || null,
    slug: attributes?.slug || null,
    title: attributes?.slug || null,
    content: attributes?.content || null,
    cover,
    excerpt: attributes?.excerpt || null,
    author: {
      avatar,
      name: attributes?.author?.data?.attributes?.name || null,
    },
  };
}

export function parsePosts(
  postsData: PostBySlugQuery | PostsPaginatedQuery | undefined
): ParsedPost[] {
  if (postsData?.posts?.data && postsData?.posts?.data.length) {
    const posts = postsData?.posts?.data as Array<PostEntity>;
    return posts.map((post) => parsePost(post));
  }

  return [];
}
