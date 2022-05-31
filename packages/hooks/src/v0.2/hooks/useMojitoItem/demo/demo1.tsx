/**
 * title: Basic usage
 * desc: This hook takes a `collectionItemID` param or a slug or pathname param (defaults to location.pathname).
 */

import React from 'react';
import { DEMO_SLUG } from '../../../components/demo/constants/demo.constants';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useMojitoItem } from '../useMojitoItem';

const DemoContent: React.FC = () => {
  const result = useMojitoItem({
    pathname: `/${DEMO_SLUG}/item/test/`,
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
