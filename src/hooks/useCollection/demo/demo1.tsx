/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React, { useState } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { config } from '../../../domain/constants/general.constants';
import { useCollection, UseCollectionProps } from '../useCollection';

const DemoContent: React.FC = () => {
  const props: UseCollectionProps = {
    slug: 'pace-gallery',
    marketplaceID: config.MARKETPLACE_ID,
  };

  const result = useCollection(props);

  // console.log(result.collection?.items.map((i)=>i.id));

  return <Json props={props} result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
