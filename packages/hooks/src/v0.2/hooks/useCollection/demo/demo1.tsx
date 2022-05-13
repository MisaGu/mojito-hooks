/**
 * title: Basic usage
 * desc: Default value is boolean，alike useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useCollection } from '../useCollection';

const DemoContent: React.FC = () => {
  const result = useCollection();

  return <pre>{JSON.stringify(result, null, '  ')}</pre>;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
