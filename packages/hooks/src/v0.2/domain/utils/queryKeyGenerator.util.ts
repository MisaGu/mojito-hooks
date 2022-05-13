import { Variables } from 'graphql-request/dist/types';
import { EMojitoQueries } from '../gql/queries';

export function queryKeyGenerator(
  query: EMojitoQueries,
  variables: Variables,
): [string, Variables] {
  return [`Mojito ${EMojitoQueries[query]}`, variables];
}

/*
export function prefetchQueryGenerator(query: EMojitoQueries, variables: Variables): [
  [string, Variables],
  typeof gqlRequest,
] {
  return [
    queryKeyGenerator(query, variables),
    gqlRequest.bind(null, {
      query: allQueries[query],
      variables,
      normalizerFn: contentfulNormalizer,
      gqlClient: contentfulGqlClient,
    }),
  ];
}
*/
