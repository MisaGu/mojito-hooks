import React, { CSSProperties } from 'react';

export interface JsonProps {
  obj: any;
}

function jsonReplacer(key: string, value: any) {
  if (key === 'queryResult') return '{ ... }';
  if (key === 'refetch') return '() => { ... }';

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
      <pre>{JSON.stringify(obj, jsonReplacer, '  ')}</pre>

      <a
        href="https://react-query.tanstack.com/reference/useQuery"
        target="_blank"
        style={LINK_STYLE}
      >
        <code>queryResult: UseQueryResult</code>
      </a>
    </>
  );
};
