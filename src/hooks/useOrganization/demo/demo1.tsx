/**
 * title: Basic usage
 * desc: This hooks takes no props.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useOrganization } from '../useOrganization';

const DemoContent: React.FC = () => {
  const result = useOrganization();

  return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
