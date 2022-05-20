/**
 * title: Basic usage
 * desc: This hook takes a required `mojitoID` param.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { Json } from '../../../components/demo/json/Json';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useContentfulShortLots } from '../useContentfulShortLots';

const DemoContent: React.FC = () => {
  const result = useContentfulShortLots({
    mojitoID: '',
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
