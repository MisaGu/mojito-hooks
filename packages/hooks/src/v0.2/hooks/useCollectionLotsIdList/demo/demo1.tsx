/**
 * title: Basic usage
 * desc: Default value is boolean，alike useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { DemoInterface } from '../../../components/demo/interface/DemoInterface';
import { Json } from '../../../components/demo/json/Json';
import { DemoProviders } from '../../../components/demo/provider/DemoProvider';
import { useCollectionLotsIdList } from '../useCollectionLotsIdList';

const DemoContent: React.FC = () => {
  const result = useCollectionLotsIdList('bid-test-3');

  return <Json obj={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
