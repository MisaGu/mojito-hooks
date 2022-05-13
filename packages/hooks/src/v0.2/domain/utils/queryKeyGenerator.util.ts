import { Variables } from 'graphql-request/dist/types';
import { EMojitoQueries } from '../gql/queries';

const queryKeyGenerator = (query: EMojitoQueries, variables: Variables) => [
  `Mojito ${EMojitoQueries[query]}`,
  variables,
];
