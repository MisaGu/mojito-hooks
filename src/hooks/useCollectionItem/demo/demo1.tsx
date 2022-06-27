/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React, { useState } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useCollectionItem } from '../useCollectionItem';

const DemoContent: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const ids = [
    'fbe91f8d-f1a8-4ee4-9e1e-16a60bff8c0a',
    '2e14a4a1-8f7e-404e-800f-bc43a84d94d0',
    '70a68534-d9a5-4458-9a72-4ecb49ef30f8',
    '91644e3f-2a25-4c31-a6e1-7685a17574f8',
    'c0c6d7e8-92f2-4e68-b964-905f48fd9b88',
  ];

  const result = useCollectionItem({
    collectionSlug: 'new-reference-app-demo',
    id: ids[idx],
  });

  return (
    <>
      <div
        onClick={() => {
          setIdx((i) => (i + 1) % 5);
        }}
      >
        Change Id
      </div>
      <br />
      <br />
      <Json result={result} />
    </>
  );
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
