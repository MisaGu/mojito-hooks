/**
 * title: Basic usage
 * desc: This hooks takes no props.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { Json } from '../../../components/demo/json/Json';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useContentfulAuctionsSlugList } from '../useContentfulAuctionsSlugList';

const DemoContent: React.FC = () => {
  const result = useContentfulAuctionsSlugList();

  return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
