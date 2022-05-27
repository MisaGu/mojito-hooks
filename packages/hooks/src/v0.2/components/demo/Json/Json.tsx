import React, { useCallback, useState } from 'react';
import { QueryResult } from '../../../domain/utils/gql.utils';
import { QUERY_CLIENT_STALE_TIME } from '../../../domain/utils/gqlRequest.util';
import { isBrowser } from '../../../domain/utils/isBrowser.util';
import { log } from '../../../domain/utils/log.utils';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import {
  ROOT_STYLE,
  ACTIONS_STYLE,
  BUTTON_STYLE,
  HEADER_STYLE,
  LABEL_STYLE,
  CHECKBOX_STYLE,
} from './Json.constants';

function jsonReplacerFunctions(key: string, value: any) {
  if (key === 'refetch' || typeof value === 'function') return '() => { ... }';
  if (typeof value === 'undefined') return 'undefined';

  return value;
}

function jsonReplacerSummary(key: string, value: any) {
  if (key === 'queryResult') return '{ ... }';

  return jsonReplacerFunctions(key, value);
}

function getQueryResultLabel(result: QueryResult<string>) {
  const {
    isLoading,
    error,
    queryResult: { isFetching, isStale, dataUpdatedAt },
  } = result;

  if (isLoading) return '💿 Loading...';
  else if (isFetching) return '💿 Fetching...';
  else if (error) return '❌ Error';
  else if (isStale) return '⌛ Stale';
  else return `📅 Fetched at ${new Date(dataUpdatedAt).toLocaleString()}`;
}

const showQueryResultKey = 'showQueryResult';

export interface JsonProps {
  result: QueryResult<string>;
  staleTime?: number;
}

export const Json: React.FC<JsonProps> = ({ result, staleTime = QUERY_CLIENT_STALE_TIME }) => {
  const {
    refetch,
    queryResult: { dataUpdatedAt },
  } = result;

  const handleRefetch = useCallback(() => {
    log('🔄 Refetching clicked...');

    refetch();
  }, []);

  const [showQueryResult, setShowQueryResult] = useState(() => {
    return isBrowser ? localStorage.getItem(showQueryResultKey) === 'true' : false;
  });

  const handleToggleShowQueryResult = useCallback(() => {
    setShowQueryResult((prevShowQueryResult) => {
      const nextShowQueryResult = !prevShowQueryResult;

      localStorage.setItem(showQueryResultKey, `${nextShowQueryResult}`);

      return nextShowQueryResult;
    });
  }, []);

  return (
    <div style={ROOT_STYLE}>
      <div style={HEADER_STYLE}>
        <ProgressBar start={dataUpdatedAt} duration={QUERY_CLIENT_STALE_TIME} />

        {getQueryResultLabel(result)}

        <button style={BUTTON_STYLE} onClick={handleRefetch}>
          🔄
        </button>
      </div>

      <pre>
        {JSON.stringify(
          result,
          showQueryResult ? jsonReplacerFunctions : jsonReplacerSummary,
          '  ',
        )}
      </pre>

      <div style={ACTIONS_STYLE}>
        <label style={LABEL_STYLE}>
          <input
            type="checkbox"
            onChange={handleToggleShowQueryResult}
            checked={showQueryResult}
            style={CHECKBOX_STYLE}
          />

          <span>Expand queryResult: UseQueryResult</span>
        </label>

        <a
          href="https://react-query.tanstack.com/reference/useQuery"
          target="_blank"
          style={BUTTON_STYLE}
        >
          ℹ️
        </a>
      </div>
    </div>
  );
};
