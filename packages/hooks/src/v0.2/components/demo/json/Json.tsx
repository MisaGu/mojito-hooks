import React, { CSSProperties } from 'react';
import { UseQueryResult } from 'react-query';

export interface JsonProps {
  obj: any;
}

const QUERY_RESPONSE_PROPS = [
  'data',
  'dataUpdatedAt',
  'error',
  'errorUpdatedAt',
  'errorUpdateCount',
  'failureCount',
  'isError',
  'isFetched',
  'isFetchedAfterMount',
  'isFetching',
  'isIdle',
  'isLoading',
  'isLoadingError',
  'isPlaceholderData',
  'isPreviousData',
  'isRefetchError',
  'isRefetching',
  'isStale',
  'isSuccess',
  'refetch',
  'remove',
  'status',
];

function jsonReplacer(key: string, value: any) {
  if (QUERY_RESPONSE_PROPS.includes(key)) return;

  return value;
}

const LINK_STYLE: CSSProperties = {
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: '4px',
  background: '#F0F0F0',
  marginTop: '16px',
  fontFamily: 'monospace',
  color: 'blue',
  textDecoration: 'none',
};

export const Json: React.FC<JsonProps> = ({ obj }) => {
  return (
    <>
      <pre style={{ margin: 0 }}>{JSON.stringify(obj, jsonReplacer, '  ')}</pre>

      <a
        href="https://react-query.tanstack.com/reference/useQuery"
        target="_blank"
        style={LINK_STYLE}
      >
        + UseQueryResult's props.
      </a>
    </>
  );
};
