/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 23:53
 */

import { useEffect, useState } from 'react';

import { parsePosts } from '@/lib/parser';

import { useNewsPostsQuery } from '@/generated';

import { ParsedPost } from '@/types';

type Props = {
  limit: number;
  start: number;
};

export default function useParsedNewsPosts(props: Props) {
  const { data, error, isLoading } = useNewsPostsQuery(props);
  const [parsedNewsPosts, setParsedNewsPosts] = useState<ParsedPost[]>([]);

  useEffect(() => {
    setParsedNewsPosts(parsePosts(data));
  }, [data]);

  return {
    error,
    isLoading,
    data: { parsedNewsPosts, meta: data?.newsPosts?.meta },
  };
}
