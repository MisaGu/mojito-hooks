import React, { useCallback, useState } from 'react';
import { QueryResult } from '../../../domain/utils/gqlResult.utils';
import { QUERY_CLIENT_STALE_TIME } from '../../../domain/utils/gqlRequest.util';
import { isBrowser } from '../../../domain/utils/isBrowser.util';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import {
  ACTIONS_STYLE,
  BUTTON_STYLE,
  CHECKBOX_STYLE,
  HEADER_STYLE,
  LABEL_STYLE,
  PROPS_CONTROLS_STYLE,
  PROPS_WRAPPER_STYLE,
  ROOT_STYLE,
} from './Json.constants';
import { Pagination, PaginationProps } from '../Pagination/Pagination';

function jsonReplacerFunctions(key: string, value: any) {
  if (key === 'refetch' || typeof value === 'function') return '() => { ... }';
  if (typeof value === 'undefined') return 'undefined';

  return value;
}

function jsonReplacerSummary(key: string, value: any) {
  if (key === 'queryResult') return '{ ... }';

  return jsonReplacerFunctions(key, value);
}

function getQueryResultLabel(result: Omit<QueryResult<string>, 'refetch'>) {
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
  paginationProps: PaginationProps;
  controls?: React.ReactNode;
  props?: Record<string, any>;
  result: QueryResult<string> | Omit<QueryResult<string>, 'refetch'>;
  staleTime?: number;
}

export const Json: React.FC<JsonProps> = ({
  paginationProps,
  controls,
  props,
  result,
  staleTime = QUERY_CLIENT_STALE_TIME,
}) => {
  const [refetchResult, setRefetchResult] = useState(null);
  const dataUpdatedAt = result.queryResult.dataUpdatedAt;
  const refetch =
    result.refetch || Object.values(result).find((property) => typeof property === 'function');

  const handleRefetch = useCallback(async () => {
    if (!refetch) {
      console.log('No refetch() or any other function found in result.');

      return;
    }

    try {
      const refetchResponse = await refetch();

      setRefetchResult(refetchResponse || null);
    } catch (err) {
      console.log('Error calling or resolving refetch():', err);
    }
  }, [refetch]);

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
      {(paginationProps || controls || props) && (
        <div style={PROPS_WRAPPER_STYLE}>
          {(paginationProps || controls) && (
            <div style={PROPS_CONTROLS_STYLE}>
              {paginationProps && <Pagination {...paginationProps} />}
              {controls}
            </div>
          )}

          {props && <pre>{JSON.stringify(props, null, '  ')}</pre>}
        </div>
      )}

      <div style={HEADER_STYLE}>
        <ProgressBar start={dataUpdatedAt} duration={staleTime} />

        {refetchResult ? 'Refetch' : getQueryResultLabel(result)}

        <button style={BUTTON_STYLE} onClick={handleRefetch}>
          🔄
        </button>
      </div>

      <pre>
        {JSON.stringify(
          refetchResult || result,
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
