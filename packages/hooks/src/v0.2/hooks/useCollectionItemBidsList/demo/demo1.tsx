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
import { useCollectionItemBidsList } from '../useCollectionItemBidsList';

const DemoContent: React.FC = () => {
  const result = useCollectionItemBidsList({
    collectionItemID: '549c4f64-ca4d-4087-a8a6-3b8ce1ecf059',
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
