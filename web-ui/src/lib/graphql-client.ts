/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 10 2021
 * @ Time: 02:24
 */

import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_API || '');

export { graphQLClient };
