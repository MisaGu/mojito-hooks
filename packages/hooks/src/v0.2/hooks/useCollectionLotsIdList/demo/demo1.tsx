/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { Json } from '../../../components/demo/json/Json';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useCollectionLotsIdList } from '../useCollectionLotsIdList';

const DemoContent: React.FC = () => {
  const result = useCollectionLotsIdList({
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
