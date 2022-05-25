/**
 * title: Basic usage
 * desc: This hook takes a required `mojitoID` param.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useContentfulShortLots } from '../useContentfulShortLots';

const DemoContent: React.FC = () => {
  const result = useContentfulShortLots({
    mojitoID: ['5f6a59f0-63bb-4628-b0ff-fcad26559a09', '600f19c6-0bad-4442-bc69-1d2db645292c'],
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
