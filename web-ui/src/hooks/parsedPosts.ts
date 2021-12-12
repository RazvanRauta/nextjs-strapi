/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 23:53
 */

import { useEffect, useState } from 'react';

import { parsePosts } from '@/lib/parser';

import { usePostsPaginatedQuery } from '@/generated';

import { ParsedPost } from '@/types';

type Props = {
  limit: number;
  start: number;
};

export default function useParsedPosts(props: Props) {
  const { data, error, isLoading } = usePostsPaginatedQuery(props);
  const [parsedPosts, setParsedPosts] = useState<ParsedPost[]>([]);

  useEffect(() => {
    setParsedPosts(parsePosts(data));
  }, [data]);

  return {
    error,
    isLoading,
    data: { parsedPosts, meta: data?.posts?.meta },
  };
}
