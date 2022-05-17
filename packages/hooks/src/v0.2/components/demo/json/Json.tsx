import React from 'react';
import { QueryResult } from '../../../domain/utils/gql.utils';
import { QUERY_CLIENT_STALE_TIME } from '../../../domain/utils/gqlRequest.util';
import { ROOT_STYLE, ACTIONS_STYLE, LINK_STYLE, BUTTON_STYLE } from './Json.constants';

function jsonReplacer(key: string, value: any) {
  if (key === 'queryResult') return '{ ... }';
  if (key === 'refetch') return '() => { ... }';

  return value;
}

export interface JsonProps {
  obj: any;
  result: QueryResult<string>;
  staleTime?: number;
}

export const Json: React.FC<JsonProps> = ({ obj, result, staleTime = QUERY_CLIENT_STALE_TIME }) => {
  // const { isLoading, error, refetch, queryResult: { isStale, dataUpdatedAt } } = result;

  return (
    <div style={ROOT_STYLE}>
      <pre>{JSON.stringify(obj, jsonReplacer, '  ')}</pre>

      <div style={ACTIONS_STYLE}>
        <a
          href="https://react-query.tanstack.com/reference/useQuery"
          target="_blank"
          style={LINK_STYLE}
        >
          queryResult: UseQueryResult
        </a>

        <button style={BUTTON_STYLE}>refetch()</button>
      </div>
    </div>
  );
};
