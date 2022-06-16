/**
 * title: Basic usage
 * desc: This hooks takes no props.
 */

import React, { useRef } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useActiveBids } from '../useActiveBids';

const DemoContent: React.FC = () => {
  const result = useActiveBids();

  return <Json result={result} />;
};
export default () => {
  const counter = useRef(0);
  console.log('default', counter.current++);

  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
