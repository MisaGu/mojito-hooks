/**
 * title: Basic usage
 * desc: This hook takes a required `collectionItemID` param, plus an optional slug or pathname param (defaults to location.pathname).
 */

import React from 'react';
import {
  DEMO_COLLECTION_ITEM_ID,
  DEMO_SLUG,
} from '../../../components/demo/constants/demo.constants';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useCollectionItemCurrentBids } from '../useCollectionItemCurrentBids';

const DemoContent: React.FC = () => {
  const result = useCollectionItemCurrentBids({
    collectionItemID: DEMO_COLLECTION_ITEM_ID,
    slug: DEMO_SLUG,
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
