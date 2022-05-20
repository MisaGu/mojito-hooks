/**
 * title: Basic usage
 * desc: This hook takes a required `collectionItemID` param, plus an optional slug or pathname param (defaults to location.pathname).
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { Json } from '../../../components/demo/json/Json';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useCollectionItemCurrentBids } from '../useCollectionItemCurrentBids';

const DemoContent: React.FC = () => {
  const result = useCollectionItemCurrentBids({
    collectionItemID: '549c4f64-ca4d-4087-a8a6-3b8ce1ecf059',
    slug: 'bid-test-3',
  });

  return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
