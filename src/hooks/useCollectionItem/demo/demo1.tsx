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
    '35c7e832-d816-4e11-88fb-f9fc979acfc3',
    'f449d832-8f7d-4968-933c-63809d49bff2',
    'c537586f-693d-4448-ba69-2605164b3780',
    '0973365b-c6c1-4338-820b-60bd05abbcf1',
    'ca574c04-3f6f-4a42-9b41-70ad63efea9b',
  ];

  const result = useCollectionItem({
    collectionSlug: 'pace-gallery',
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
