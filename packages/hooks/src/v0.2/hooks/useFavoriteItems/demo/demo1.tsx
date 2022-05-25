/**
 * title: Basic usage
 * desc: This hooks takes no props.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useFavoriteItems } from '../useFavoriteItems';

const DemoContent: React.FC = () => {
  const result = useFavoriteItems();

  return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
