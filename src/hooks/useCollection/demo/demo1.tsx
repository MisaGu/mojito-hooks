/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useCollection } from '../useCollection';

const DemoContent: React.FC = () => {
  const result = useCollection({
    slug: 'new-reference-app-demo',
  });

  // console.log(result.collection?.items.map((i)=>i.id));

  return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
