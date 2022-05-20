/**
 * title: Basic usage
 * desc: This hook takes a required `collectionItemID` param.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { Json } from '../../../components/demo/json/Json';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useCollectionItemRemainingCount } from '../useCollectionItemRemainingCount';

const DemoContent: React.FC = () => {
  const result = useCollectionItemRemainingCount({
    collectionItemID: '549c4f64-ca4d-4087-a8a6-3b8ce1ecf059',
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
