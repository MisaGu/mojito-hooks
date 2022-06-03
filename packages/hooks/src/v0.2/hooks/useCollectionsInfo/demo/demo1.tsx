/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React from 'react';
import { DEMO_SLUG } from '../../../components/demo/constants/demo.constants';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { getCollectionSlug } from '../../../domain/utils/getSlug.util';

const DemoContent: React.FC = () => {
  const result = getCollectionSlug(DEMO_SLUG);
  return null;
  // return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
