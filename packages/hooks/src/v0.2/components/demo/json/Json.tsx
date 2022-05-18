import { useThrottledRAF } from '@swyg/corre';
import React, { useCallback, useRef, useState } from 'react';
import { QueryResult } from '../../../domain/utils/gql.utils';
import { QUERY_CLIENT_STALE_TIME } from '../../../domain/utils/gqlRequest.util';
import { isBrowser } from '../../../domain/utils/isBrowser.util';
import {
  ROOT_STYLE,
  ACTIONS_STYLE,
  BUTTON_STYLE,
  HEADER_STYLE,
  LABEL_STYLE,
  CHECKBOX_STYLE,
  PROGRES_BAR_STYLE,
} from './Json.constants';

function jsonReplacerFunctions(key: string, value: any) {
  if (key === 'refetch' || typeof value === 'function') return '() => { ... }';

  return value;
}

function jsonReplacerSummary(key: string, value: any) {
  if (key === 'queryResult') return '{ ... }';

  return jsonReplacerFunctions(key, value);
}

const showQueryResultKey = 'showQueryResult';

const initialShowQueryResult = isBrowser
  ? localStorage.getItem(showQueryResultKey) === 'true'
  : false;

export interface JsonProps {
  result: QueryResult<string>;
  staleTime?: number;
}

export const Json: React.FC<JsonProps> = ({ result, staleTime = QUERY_CLIENT_STALE_TIME }) => {
  const {
    isLoading,
    error,
    refetch,
    queryResult: { isFetching, isStale, dataUpdatedAt },
  } = result;

  const handleRefetch = useCallback(() => {
    console.log('🔄 Refetching clicked...');

    refetch();
  }, []);

  const [showQueryResult, setShowQueryResult] = useState(initialShowQueryResult);

  const handleToggleShowQueryResult = useCallback(() => {
    setShowQueryResult((prevShowQueryResult) => {
      const nextShowQueryResult = !prevShowQueryResult;

      localStorage.setItem(showQueryResultKey, `${nextShowQueryResult}`);

      return nextShowQueryResult;
    });
  }, []);

  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // TODO: Replace with useProgress once published:
  useThrottledRAF(
    () => {
      const progressBar = progressBarRef.current;

      if (!progressBar) return;

      const dataExpiresAt = dataUpdatedAt + QUERY_CLIENT_STALE_TIME;
      const dataRemainingTTL = (dataExpiresAt - Date.now()) / QUERY_CLIENT_STALE_TIME;
      const dataExpirationProgress = 100 * Math.min(1, 1 - dataRemainingTTL);

      progressBar.style.width = `${dataExpirationProgress}%`;

      if (dataExpirationProgress === 100) {
        progressBar.style.setProperty('--progressBarAccent', '#000');
      } else if (dataExpirationProgress > 95) {
        progressBar.style.setProperty('--progressBarAccent', '#F00');
      } else if (dataExpirationProgress < 1) {
        progressBar.style.setProperty('--progressBarAccent', '#4569D4');
      }
    },
    dataUpdatedAt ? 16 : null,
  );

  let statusLabel = '';

  if (isLoading) statusLabel = '💿 Loading...';
  else if (isFetching) statusLabel = '💿 Fetching...';
  else if (error) statusLabel = '❌ Error';
  else if (isStale) statusLabel = '⌛ Stale';
  else statusLabel = `📅 Fetched at ${new Date(dataUpdatedAt).toLocaleString()}`;

  return (
    <div style={ROOT_STYLE}>
      <div style={HEADER_STYLE}>
        <div style={PROGRES_BAR_STYLE} ref={progressBarRef}></div>

        {statusLabel}

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
