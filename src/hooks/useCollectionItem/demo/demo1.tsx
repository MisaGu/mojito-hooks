/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React, { useState } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useCollectionItem, UseCollectionProps } from '../useCollectionItem';

const DemoContent: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const ids = [
    '030a69d0-db6f-43ce-8b26-5b6c5445329b',
    '0288972f-db8e-4ca4-ad02-82ae03f2211b',
    'ec1155d8-e102-492e-8608-80e19bcb0e10',
    '87f9fe25-d189-4a3e-87bf-3bdd435b92d0',
    'c8fc18eb-fea0-4d57-a8c3-d500da58e40b',
    '225c7cd6-10c2-40fa-9df1-a1fa2523b7c5',
  ];

  const props: UseCollectionProps = {
    collectionSlug: 'pace-gallery',
    id: ids[idx],
  };

  const result = useCollectionItem(props);

  return (
    <Json
      props={props}
      result={result}
      controls={
        <button
          onClick={() => {
            setIdx((i) => (i + 1) % ids.length);
          }}
        >
          Change Id
        </button>
      }
    />
  );
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
