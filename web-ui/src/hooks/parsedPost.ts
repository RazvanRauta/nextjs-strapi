/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 23:08
 */
import { useEffect, useState } from 'react';

import { parsePosts } from '@/lib/parser';

import { PublicationState, usePostBySlugQuery } from '@/generated';

import { ParsedPost } from '@/types/index';

type SlugAndPreview = {
  slug?: string | string[];
  preview?: boolean | null;
};

const getSlug = ({ slug, preview }: SlugAndPreview) =>
  typeof slug === 'string'
    ? {
        slug,
        state: preview ? PublicationState.Preview : PublicationState.Live,
      }
    : {
        slug: '',
        state: preview ? PublicationState.Preview : PublicationState.Live,
      };

export default function useParsedArticle(props: SlugAndPreview) {
  const { data, error, isLoading } = usePostBySlugQuery(getSlug(props));
  const [parsedPost, setParsedPost] = useState<ParsedPost>();

  useEffect(() => {
    setParsedPost(parsePosts(data)[0]);
  }, [data]);

  return { error, isLoading, parsedPost };
}
