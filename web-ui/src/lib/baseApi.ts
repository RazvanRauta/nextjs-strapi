/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 13:53
 */

import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { HYDRATE } from 'next-redux-wrapper';

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_API || '');

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    client,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  refetchOnMountOrArgChange: 900, //number of seconds
  endpoints: () => ({}),
});
