/**
 * title: Basic usage
 * desc: This hooks takes no props.
 */

import React, { useRef } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useActiveBids, useActiveBids2, useActiveBids3 } from '../useActiveBids';

const DemoContent: React.FC = () => {
  const result = useActiveBids();
  const counter = useRef(0);

  // console.log('DemoContent', counter.current++);

  return null;
};

const DemoContent2: React.FC = () => {
  const result = useActiveBids2();
  const counter = useRef(0);

  console.log('DemoContent2', counter.current++, result.activeBids);

  return <Json result={result} />;
};

const DemoContent3: React.FC = () => {
  const result = useActiveBids3();
  const counter = useRef(0);

  return <Json result={result} />;
};

export default () => {
  const counter = useRef(0);
  console.log('default', counter.current++);

  return (
    <DemoProviders>
      {/* <DemoInterface demoComponent={DemoContent} /> */}
      <DemoInterface demoComponent={DemoContent2} />
      {/* <DemoInterface demoComponent={DemoContent3} /> */}
    </DemoProviders>
  );
};
