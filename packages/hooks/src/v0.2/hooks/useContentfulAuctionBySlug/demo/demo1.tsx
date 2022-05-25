/**
 * title: Basic usage
 * desc: This hook takes a required `mojitoID` param.
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useContentfulAuctionBySlug } from '../useContentfulAuctionBySlug';

const DemoContent: React.FC = () => {
  const result = useContentfulAuctionBySlug({
    slug: 'lfc',
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
